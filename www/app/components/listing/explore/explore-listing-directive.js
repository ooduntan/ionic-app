angular.module('healthyPlaces.listing')
  .directive('exploreListing', ['Categories',
    function(Categories) {
      var ctrl = ['$scope',function($scope) {
        var vm = this;

        vm.numberOfCategories = 0;

        vm.maplist = function() {
          var btnlist = angular.element(document.querySelector('#btnlist'));
          var btnmap = angular.element(document.querySelector('#btnmap'));
          btnlist.removeClass('btnactive');
          btnlist.addClass('btnNormal');
          btnmap.removeClass('btnNormal');
          btnmap.addClass('btnactive');
          vm.explorelist = false;
        };

        vm.itemlist = function() {
          var btnlist = angular.element(document.querySelector('#btnlist'));
          var btnmap = angular.element(document.querySelector('#btnmap'));
          btnlist.removeClass('btnNormal');
          btnlist.addClass('btnactive');
          btnmap.removeClass('btnactive');
          btnmap.addClass('btnNormal');
          vm.explorelist = true;
        };

        vm.filterMarkers = function(searchText) {
          Categories.setText(searchText);
        };

        Categories.onChange(function(){
          vm.numberOfCategories = Categories.numberOfSelectedCategories();
        });

      }];
      return {
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/listing/explore/explore-listing-directive.html'
      }
    }]);
