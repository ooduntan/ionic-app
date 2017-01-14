angular.module('healthyPlaces.deal')
  .config(["$stateProvider", function($stateProvider) {

    /*$stateProvider
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'js/app/about/pages/about.html'
          }
        }
      });*/
    $stateProvider
      .state('app.categories', {
        url: '/categories',
        views: {
          'menuContent': {
            templateUrl: 'app/components/category/pages/find.html'
          }
        }
      })
  }]);
