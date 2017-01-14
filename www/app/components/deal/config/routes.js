angular.module('healthyPlaces.deal')
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('app.findDeal', {
        url: '/findDeal',
        views: {
          'menuContent': {
            templateUrl: 'app/components/deal/pages/find.html'
          }
        }
      })
      .state('app.findOneDeal', {
        url: '/findOneDeal',
        params: {
          coupon: null
        },
        views: {
          'menuContent': {
            templateUrl: 'app/components/deal/pages/find-one.html'
          }
        }
      })
    ;
  }]);
