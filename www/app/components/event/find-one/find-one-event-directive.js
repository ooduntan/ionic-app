angular.module('healthyPlaces.event')
  .directive('findOneEvent', ['$firebaseObject', 'BACKEND_URL', 'eventData', '$rootScope', '$ionicPopup', '$stateParams', '$state', 'openWebSite',
    function ($firebaseObject, BACKEND_URL, eventData, $rootScope, $ionicPopup, $stateParams, $state, openWebSite) {

      var ctrl = function () {
        var vm = this;
        debugger

        //TODO: convert this to an Angular filter (same fx is in locationdetail.js)
        this.dialPhoneNumber = function(phoneNumber){
          var num = "tel:"+phoneNumber.replace(/[^\d\+]/g,"");
          window.open(num, '_system', 'location=yes');
        };

        vm.goCoupon = function(couponId){
          $state.go('app.findOneDeal', {coupon: couponId});
        };

        vm.goWebsite = function(url) {
          openWebSite.withUrl(url);
        };

        this.openNativeMap = function(event) {
          launchnavigator.navigate(event.street + ", " + event.city + ", " + "FL" + ", " + event.zipcode);
        };

        vm.getFormattedDate = function(date, style) {
          return moment(date).format(style);
        };

        this.showSpecialOffer = function(){
          var scope = $rootScope.$new(true);
          $ionicPopup.show({
            template: vm.event.special_offer,
            title: 'Special Offer',
            scope: scope,
            buttons: [{
              text: '<b>Close</b>',
              type: 'button-custom button-royal'
            }]
          });
        };

        if($stateParams.eventP){
          var obj = $firebaseObject(new Firebase(BACKEND_URL + 'events/' + $stateParams.eventP));
          obj.$loaded().then(function(data) {
            vm.event = data;
          });
        } else {
          vm.event = eventData.currentEvent;
        }
      };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/event/find-one/find-one-event-directive.html'
      }
    }]);
