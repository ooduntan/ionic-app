angular.module('healthyPlaces.listing')
  .directive('toggleFavorite', ['Session', 'listingData',
    function(Session, listingData) {
      var ctrl = function($scope) {

        var vm = this;
        vm.user = Session.currentUser;
        var waitForListing = $scope.$watch(function(){
          return listingData.current;
        }, function(){
          if(listingData.current){
            vm.listing = listingData.current;
            waitForListing();
          }
        });
        this.handleFavorite = function() {
          if (vm.user) {
            vm.user.toggleFavorite(vm.listing.id);
          } else {
            Session.isAuth('Please login to save favorites.');
          }
        };
      };
      return {
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/listing/toggle-favorite/toggle-favorite-directive.html'
      }
    }]);
