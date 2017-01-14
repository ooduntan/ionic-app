angular.module('healthyPlaces.layout')
  .directive('tab', ['$ionicTabsDelegate', '$state',
    function($ionicTabsDelegate, $state) {
      var ctrl = function($scope) {
        var vm = this;
        vm.checkTab = function() {
          var active = $ionicTabsDelegate.selectedIndex();
          if (active === 0) {
        //     $state.reload();
          } else {
        //     $ionicTabsDelegate.select(0);
          }
        console.log(active, 'this is active');
        debugger;
          $ionicTabsDelegate.select(0);
        }

      };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/layout/tab/tab-directive.html'
      }
    }]);
