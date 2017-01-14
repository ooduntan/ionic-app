angular.module('healthyPlaces.session')
  .factory('Session', ['$q', 'User', '$state', 'BACKEND_URL', '$firebaseAuth', '$rootScope', '$ionicPopup',
    function($q, User, $state, BACKEND_URL, $firebaseAuth, $rootScope, $ionicPopup) {

      function Session() {
        var ref = new Firebase(BACKEND_URL);
        var user = ref.getAuth();
        if(user != null && user != 'null'){
          this.currentUser = new User(user);
        }else{
          this.currentUser = null;
        }
      }

      Session.prototype.isAuth = function(message){
        var alertMessage = message;

        if(this.exist()){
          return true;
        }
        var scope = $rootScope.$new(true);
        $ionicPopup.show({
          title: 'Unauthorized',
          template: alertMessage,
          scope: scope,
          buttons: [{
            text: '<b>OK</b>',
            type: 'button-royal',
            onTap: function(e) {
              $state.go('home');
            }
          }, {
            text: '<b>CANCEL</b>',
            type: 'button-custom button-royal'
          }]
        });
        return false;
      };

      Session.prototype.exist = function(){
        return ((!angular.isUndefined(this.currentUser)) && (this.currentUser!==null));
      };

      Session.prototype.create = function(user) {
        var deferred = $q.defer();
        var vm = this;
        var ref = new Firebase(BACKEND_URL);
        ref.authWithPassword({
          email    : user.email,
          password : user.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
            deferred.reject();
          } else {
            vm.currentUser = new User(authData);
            console.log("Authenticated successfully with payload:", authData);
            deferred.resolve();
          }
        });
        return deferred.promise;
      };

      Session.prototype.destroy = function() {
        var deferred = $q.defer();
        var vm = this;
        var ref = new Firebase(BACKEND_URL);
        ref.unauth();
        this.currentUser = null;
        deferred.resolve();
        return deferred.promise;
      };

      Session.prototype.createByFacebook = function(){
        var deferred = $q.defer();
        var ref = new Firebase(BACKEND_URL);
        var auth = $firebaseAuth(ref);
        var vm = this;
        auth.$authWithOAuthPopup('facebook', { scope: "email"}).then(function(authData) {
          vm.currentUser = new User(authData);
          deferred.resolve();
        }).catch(function(error) {
          deferred.reject();
        });
        return deferred.promise;
      };

      var session = new Session();
      return session;
    }]);
