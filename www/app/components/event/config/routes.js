angular.module('healthyPlaces.event')
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('app.findEvent', {
        url: '/findEvent',
        params: {
          event: null
        },
        views: {
          'menuContent': {
            templateUrl: 'app/components/event/pages/find.html'
          }
        }
      });
    $stateProvider
      .state('app.findOneEvent', {
        url: '/findOneEvent',
        params: {
          eventP: 1
        },
        views: {
          'menuContent': {
            templateUrl: 'app/components/event/pages/find-one.html'
          }
        }
      });
  }]);
