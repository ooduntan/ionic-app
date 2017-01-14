angular.module('healthyPlaces.utils')
  .directive('adLoad', ['$firebaseArray', '$firebaseObject', 'BACKEND_URL', 'Categories', '$state',
    function($firebaseArray, $firebaseObject, BACKEND_URL, Categories, $state) {
      var ctrl = function() {
        var vm = this;
        var adsRef = new Firebase(BACKEND_URL+ "ads/");

        Categories.onChange(function(){
          vm.loadBestAd();
        });

        vm.loadBestAd = function() {
          if (!vm.adLoc.startsWith('Explore')) {
            vm.loadDefaultAd();
          } else {
            vm.getBestAdByCategories().then(function(ad) {
              if (ad != null) {
                vm.ad = ad[0];
              }
              if (ad == null) {
                vm.loadDefaultAd();
              }
            });
          }
        };
        vm.getBestAdByCategories = function() {
          var cats = Categories.get().filterCategories;
          if (cats.length == 0) {
            return Promise.resolve(null);
          }
          var catAds = $firebaseArray(adsRef.orderByChild('ad_location').equalTo('Filter_Header').limitToFirst(1));
          var catAdPromise= catAds.$loaded();
          catAdPromise.then(function(){
            angular.forEach(cats,function(cat) {
              catAds.forEach(function(catAd) {
                if(catAd.categorie == cat) {
                  return catAd;
                }
              });
            });
          });
          return catAdPromise;
        };

        vm.loadDefaultAd = function() {
          var objPromise = $firebaseArray(adsRef.orderByChild('ad_location').equalTo(vm.adLoc).limitToFirst(1));
          objPromise.$loaded().then(function(){
            vm.ad = objPromise[0];
          });
        };

        vm.handleClick = function() {
          alert('I got here');
            console.log("app.findOneEvent: ", vm);
            $state.go('app.findOneEvent', {eventP: '1'});
            // $state.go('app.explore');
            
          // if(vm.ad.launch_url) {
          //   window.open(encodeURI(vm.ad.launch_url), '_system', 'location=yes');
          // } else if (vm.ad.location) {
          //   $state.go('app.locdetali', {locid: vm.ad.location});
          // } else if (vm.ad.event) {
          //   var temp3 = $state.go('app.findOneEvent', {event: vm.ad.event});
          // } else if (vm.ad.coupon) {
          //   $state.go('app.findOneDeal', {coupon: vm.ad.coupon});
          // }
        };

        vm.loadBestAd();
      };
      return {
        bindToController: true,
        controllerAs: 'vm',
        scope: {
          adLoc: '@'
        },
        controller: ctrl,
        templateUrl: 'app/components/utils/ad-load/ad-load-directive.html'
      };
    }]);
