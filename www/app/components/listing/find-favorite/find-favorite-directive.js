angular.module('healthyPlaces.listing')
  .directive('findFavorite', ['Session', 'Color', '$state', 'Listing',
    function(Session, Color, $state, Listing) {
      var ctrl = function() {
        var vm = this;

        vm.orderByKey = 'distance';

        //TODO: If currentUser is nil, take user to login.
        if (Session.currentUser == null) {
          vm.listings = [];
        } else {
          Listing.find(Session.currentUser.findFavoriteListings(), 0, [], function (listings) {
            vm.listings = listings;
          });
        }
        vm.resturantDescription = function(locid) {
          $state.go('app.locdetali', {
            locid: locid
          });
        };

        vm.colorForCategory = function(category) {
          return Color.colorForCategory(category);
        };

      };
      return {
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        replace: true,
        controller: ctrl,
        templateUrl: 'app/components/listing/find-favorite/find-favorite-directive.html'
      }
    }]);
