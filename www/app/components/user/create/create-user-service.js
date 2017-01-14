angular.module('healthyPlaces.user')
  .factory('createUser', ['$ionicPopup', '$rootScope', 'User', 'Session', '$state',function($ionicPopup, $rootScope, User, Session, $state) {
    return {
      show: function(){
        var signUpScope = $rootScope.$new(true);
        var verifyScope = $rootScope.$new(true);

        var changePassword = function(){
          var changePasswordScope = $rootScope.$new(true);
          $ionicPopup.show({
            template: '<input type="password" ng-model="data.password">',
            title: 'ENTER PASSWORD',
            subTitle: 'Please enter your email address, and you will receive a verification email shortly.',
            scope: changePasswordScope,
            buttons: [{
              text: '<b>SUBMIT</b>',
              type: 'button-royal',
              onTap: function(e) {
                User
                  .updatePassword(signUpScope.data.email, verifyScope.data.password, changePasswordScope.data.password)
                  .then(function(){
                    $state.go('app.explore');
                  });
              }
            }, {
              text: '<b>CANCEL</b>',
              type: 'button-custom button-royal',
              onTap: function(){

              }
            }]
          });
        };

        var verifyEmail = function(){
          $ionicPopup.show({
            template: '<input type="password" ng-model="data.password">',
            title: 'VERIFY EMAIL',
            subTitle: 'Please enter your email address, and you will receive a verification email shortly.',
            scope: verifyScope,
            buttons: [{
              text: '<b>VERIFY</b>',
              type: 'button-royal',
              onTap: function(e) {
                Session
                  .create({email: signUpScope.data.email, password: verifyScope.data.password})
                  .then(function(){
                    changePassword();
                  });
              }
            }, {
              text: '<b>CANCEL</b>',
              type: 'button-custom button-royal',
              onTap: function(){
                show();
              }
            }]
          });
        };

        var show = function(){
          $ionicPopup.show({
            template: '<input type="email" ng-model="data.email" autocorrect="off" autocapitalize="none">',
            title: 'ENTER EMAIL',
            subTitle: 'Please enter your email address, and you will receive a verification email shortly.',
            scope: signUpScope,
            buttons: [{
              text: '<b>SIGNUP</b>',
              type: 'button-royal',
              onTap: function(e) {
                if(signUpScope.data.email){
                  User
                    .create(signUpScope.data.email)
                    .then(function(){
                      verifyEmail();
                    })
                    .catch(function(){
                      verifyEmail();
                    });
                }
              }
            }, {
              text: '<b>CANCEL</b>',
              type: 'button-custom button-royal'
            }]
          });
        };


        show();

      }
    }
  }]);
