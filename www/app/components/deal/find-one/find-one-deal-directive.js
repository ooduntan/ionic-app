angular.module('healthyPlaces.deal')
  .directive('findOneDeal', ['dealData', 'Session', '$rootScope', '$ionicPopup', '$state', 'BACKEND_URL', '$stateParams', 'Geo', 'openWebSite',
    function (dealData, Session, $rootScope, $ionicPopup, $state, BACKEND_URL, $stateParams, Geo, openWebSite) {
      var ctrl = function () {
        var vm = this;
        vm.isLoyalty = false;
        vm.user = Session.currentUser;
        var rootRef = new Firebase(BACKEND_URL);

        vm.init = function() {
          vm.isLoyalty = ((this.deal != null) && (this.deal.stamp != null));

          rootRef.child('events/'+vm.deal.event).once("value", function(dataSnapshot) {
            if(dataSnapshot.val() == null) {return;}
            vm.deal.event_obj = dataSnapshot.val();
          });
        };

        if($stateParams.coupon){
          rootRef.child('coupons/'+$stateParams.coupon).once("value", function(dataSnapshot) {
            vm.deal = dataSnapshot.val();
            vm.init();
            rootRef.child('locations/'+vm.deal.location).once("value", function(dataSnapshot) {
              if(dataSnapshot.val() == null) {return;}
              vm.deal.location = dataSnapshot.val();
              //var locationId = vm.deal.location;
              vm.deal.location.id = locationId;
              vm.deal.location.distance = Geo.getDistance(vm.deal.location.l[0], vm.deal.location.l[1]).toFixed(1) + ' miles';

            });
          });
        } else {
          if (dealData.currentDeal == null) {return;}
          vm.deal = dealData.currentDeal;
          vm.init();
        }

        this.getNumber = function(number){
          if(number){
            return new Array(number);
          }
          return new Array(0);
        };

        vm.goWebsite = function(url) {
          openWebSite.withUrl(url);
        };

        //TODO: convert this to an Angular filter (same fx is in locationdetail.js)
        this.dialPhoneNumber = function(phoneNumber){
          var num = "tel:"+phoneNumber.replace(/[^\d\+]/g,"");
          window.open(num, '_system', 'location=yes');
        };


        this.openNativeMap = function(event) {
          launchnavigator.navigate(event.street + ", " + event.city + ", " + "FL" + ", " + event.zipcode);
        };

        vm.handleLocClick = function() {
          $state.go('app.locdetali', {locid: vm.deal.location.id});
        };

        vm.handleEventClick = function() {
          $state.go('app.findOneEvent', {event: vm.deal.event});
        };

        this.stamp = function(){
          if (!Session.isAuth('Please login to use loyalty offers.')) {
            return;
          }

          var scope = $rootScope.$new(true);
          scope.data = {
            stamp: ''
          };
          $ionicPopup.show({
            template: '<input type="text" ng-model="data.stamp" style="width: 100%;" />',
            cssClass: 'Location-detail',
            title: 'SECRET CODE',
            subTitle: 'Please hand your device to a business representative to receive stamp.',
            scope: scope,
            buttons: [{
              text: '<b>STAMP</b>',
              type: 'button-royal button-save',
              onTap: function(e) {
                if(vm.deal.secret_code == scope.data.stamp){
                  vm.user.setStamp(vm.deal);
                } else {
                  scope.data.stamp = '';
                  vm.stamp();
                }
              }
            }, {
              text: '<b>CANCEL</b>',
              type: 'button-custom button-royal'
            }]
          });
        };

      };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/deal/find-one/find-one-deal-directive.html'
      }
    }]);
