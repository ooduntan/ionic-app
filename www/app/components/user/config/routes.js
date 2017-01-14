angular.module('healthyPlaces.user')
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('signUp', {
        url: '/signUp',
        views: {
          'menuContent': {
            templateUrl: 'app/components/user/pages/create.html'
          }
        }
      });
  }]);
