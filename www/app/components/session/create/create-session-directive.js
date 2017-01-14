angular.module('healthyPlaces.session')
  .directive('createSession', ['Session', '$state',
    function(Session, $state) {
      var ctrl = function() {

        var vm = this;
        this.login = function() {
          Session
            .create(vm.user)
            .then(function() {
              vm.init();
              $state.go('app.explore');
            })
            .catch(function(err) {
              console.error(err);
            })
        };

        this.init = function() {
          this.user = {
            email: '',
            password: ''
          };
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
        templateUrl: 'app/components/session/create/create-session-directive.html'
      }
    }]);
