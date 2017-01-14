angular.module('healthyPlaces.listing')
  .config(["$stateProvider", function($stateProvider) {

    $stateProvider
      .state('app.createListing', {
        url: '/createListing',
        views: {
          'menuContent': {
            templateUrl: 'app/components/listing/pages/create.html'
          }
        }
      })
      .state('app.findFavorite', {
        url: '/findFavorite',
        views: {
          'menuContent': {
            templateUrl: 'app/components/listing/pages/find-favorite.html'
          }
        }
      })
      .state('app.findHours', {
        url: '/findHours',
        params: {
          dates: null
        },
        views: {
          'menuContent': {
            templateUrl: 'app/components/listing/pages/find-hours.html'
          }
        }
      })
      .state('app.explore', {
        url: '/explore',
        params: {
          filterCategories: [],
          filterSubCategories: []
        },
        views: {
          'menuContent': {
            templateUrl: 'app/components/listing/pages/explore.html'
          }
        }
      })
    .state('app.locdetali', {
      url: '/locdetali',
      params: {
        locid: null
      },
      views: {
        'menuContent': {
          templateUrl: 'app/components/listing/pages/find-one.html'
        }
      }
    });


  }])
  .run(["$rootScope",function($rootScope){
      $rootScope.$on('$stateChangeStart', function (event, toState, toPramas, fromState, fromPramas) {
        console.log(event,fromState, fromPramas, 'this is watch');
        debugger;
      })
  }])
