angular.module('healthyPlaces.layout')
  .directive('menu', [ '$state', 'Session',
    function($state, Session) {
      var ctrl = function($scope) {
        var vm = this;
        vm.about = function(user) {
          $state.go('app.about');
        };

        vm.suggest = function(user) {
          $state.go('app.createListing');
        };

        $scope.$watch(function(){
          return Session.currentUser;
        }, function(){
          vm.isOffline = !Session.exist();
          vm.isOnline = Session.exist();
        });

        vm.logout = function(){
          Session.destroy();
        };

        vm.login = function(user) {
          $state.go('home');
        }

      };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/layout/menu/menu-directive.html'
      }
    }]);
