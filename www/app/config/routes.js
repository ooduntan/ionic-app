angular.module('healthyPlaces')
  .config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", 'BACKEND_URL', function($stateProvider, $urlRouterProvider, $ionicConfigProvider, BACKEND_URL) {

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.backButton.icon('ion-ios-arrow-back');
  $ionicConfigProvider.backButton.text('');

  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'app/root.html'
    });
    // if none of the above states are matched, use this as the fallback
  var ref = new Firebase(BACKEND_URL);
  var user = ref.getAuth();
  if(user != null && user != 'null'){
    $urlRouterProvider.otherwise('/app/explore');
  }else{
    $urlRouterProvider.otherwise('/home');
  }
}])
.config(function($compileProvider){
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(geo):/);
});
