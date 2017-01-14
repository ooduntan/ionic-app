angular.module('healthyPlaces.session')
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('app.signIn', {
        url: '/signIn',
        views: {
          'menuContent': {
            templateUrl: 'app/components/session/pages/create.html'
          }
        }
      });
  }]);
