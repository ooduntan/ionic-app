angular.module('healthyPlaces.listing')
  .directive('createListing', ['Listing', '$state',
    function(Listing, $state) {
      var ctrl = function() {

        var vm = this;
        this.create = function() {
         Listing
            .create(vm.listing)
            .then(function() {
              vm.init();
              $state.go('app.explore');
            })
            .catch(function(err) {
              console.error(err);
            })
        };

        this.init = function() {
          this.listing = {};
        };

        this.init();

      };
      return {
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        replace: true,
        controller: ctrl,
        templateUrl: 'app/components/listing/create/create-listing-directive.html'
      }
    }]);
