angular.module('healthyPlaces.deal')
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'app/components/static/pages/about.html'
          }
        }
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/components/static/pages/home.html'
      });
  }]);
