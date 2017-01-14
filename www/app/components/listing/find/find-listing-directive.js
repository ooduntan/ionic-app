angular.module('healthyPlaces.listing')
  .directive('findListing', ['$state', 'Geo', 'BACKEND_URL', 'Categories', '$filter', 'Color', '$timeout',
    function($state, Geo, BACKEND_URL, Categories, $filter, Color, $timeout) {
      var ctrl = ['$scope',function($scope) {
        var vm = this;

        vm.allListings = [];
        vm.listings = [];
        var radius = 1;
        var locationRef = new Firebase(BACKEND_URL + "locations/");
        var geoFire = new GeoFire(locationRef);
        var geoQuery = geoFire.query({
         center: [Geo.currentPosition.lat, Geo.currentPosition.lng],
         radius: radius
        });
        var currentListingFetching = 0;
        var tryCount = 5;

        var onFilterChange = function() {
          var newListings = Categories.filter(vm.allListings);
          if(Categories.get().text.length > 0){
            var searchText = Categories.get().text.toLowerCase();

            newListings = newListings.filter(function(item) {
              return item.name.toLowerCase().includes(searchText);
            });
          }
          vm.listings = newListings;
        };

        geoQuery.on("key_entered", function (locationId, latLang, distance) {
          currentListingFetching++;
          locationRef.child(locationId).once("value", function (dataSnapshot) {
            currentListingFetching--;
            var current = dataSnapshot.val();
            current.distance = parseFloat(distance.toFixed(1));
            current.stars = [];
            for (var j = 0; j < current.rate; j++) {
              current.stars.push("ion-star");
            }

            vm.allListings.push(current);

            $scope.$broadcast('scroll.infiniteScrollComplete');
            onFilterChange();
          });
        });

        vm.loadMore = function(initCounters){
          if(initCounters){
            currentListingFetching = 0;
            tryCount = 5;
          }
          radius += 1;
          geoQuery.updateCriteria({
            radius: radius
          });
          $timeout(function(){
            if(currentListingFetching === 0 && tryCount > 0){
              tryCount--;
              vm.loadMore(false);
            }
          }, 300);
        };

        vm.colorForCategory = function(category) {
          return Color.colorForCategory(category);
        };

        Categories.onChange(onFilterChange);

        vm.loadMore(true);
        vm.loadMore(false);
      }];
      return {
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/listing/find/find-listing-directive.html'
      }
    }]);
