angular.module('healthyPlaces.static')
  .directive('home', ['Session', '$state', 'createUser', 'BACKEND_URL', 'IS_DEBUG',
    function(Session, $state, createUser, BACKEND_URL, IS_DEBUG) {
      var ctrl = function($scope) {
        var vm = this;
        vm.BACKEND_URL = BACKEND_URL;
        vm.IS_DEBUG = IS_DEBUG;

        // var temp0 = $state.go('app.explore');
        // temp0.then(function(obj) {
        //   var temp1 = $state.go('home');
        // });

        vm.registerByFacebook = function(){
          Session
            .createByFacebook()
            .then(function(){
              $state.go('app.explore');
            });
        };
        //$ionicSideMenuDelegate.canDragContent(false);

        // Triggered on a button click, or some other target
        vm.login = function() {
          createUser.show();
          return true;
        };
        vm.loginasguest = function() {
          $state.go('app.explore');
          return true;
        };

        var rootRef = new Firebase(BACKEND_URL);



      };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/static/home/home-directive.html'
      }
    }]);
