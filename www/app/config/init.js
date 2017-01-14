angular.module('healthyPlaces')
  .run(["$ionicPlatform", 'Geo', function($ionicPlatform, Geo) {
  $ionicPlatform.ready(function() {
    Geo.refreshLocation();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

      cordova.plugins.instabug.activate(
        {
          android: '006d747f9a580ebad270d43b2c1392e4',
          ios: '006d747f9a580ebad270d43b2c1392e4'
        },
        'shake',
        {
          commentRequired: true,
          colorTheme: 'dark',
          shakingThresholdIPhone: '1.5',
          shakingThresholdIPad: '0.6',
          enableIntroDialog: false
        },
        function () {
          console.log('Instabug initialized.');
        },
        function (error) {
          console.log('Instabug could not be initialized - ' + error);
        }
      );
    }
    //TEMP: TODO: Is some replacement needed to fix this approach, "StatusBar.style(1)" that cause a JS error?
    //if (window.StatusBar) {
    //	// org.apache.cordova.statusbar required
    //	StatusBar.style(1);
    //}
    1
  });
}]);
