angular.module('healthyPlaces.deal')
  .directive('findDeal', ['$state', 'BACKEND_URL', 'dealData', 'Geo', 'Session',
    function($state, BACKEND_URL, dealData, Geo, Session) {
      var ctrl = function($scope) {
        this.coupanlist = true;
        this.coupons = null;
        this.loyalties = null;
        this.user = Session.currentUser;
        var vm = this;

        var rootRef = new Firebase(BACKEND_URL);

        rootRef.child('coupons/').orderByChild("stamp").endAt(0).once("value", function(dataSnapshot) {
          vm.coupons = dataSnapshot.val();
          angular.forEach(vm.coupons, function(coupon){
            rootRef.child('locations/'+coupon.location).once("value", function(dataSnapshot) {
              var locationId = coupon.location;
              coupon.location = dataSnapshot.val();
              $scope.$apply();
            });
          });
        });

        rootRef.child('coupons/').orderByChild("stamp").startAt(1).once("value", function(dataSnapshot) {
          vm.loyalties = dataSnapshot.val();
          angular.forEach(vm.loyalties, function(loyalty){
            rootRef.child('locations/'+loyalty.location).once("value", function(dataSnapshot) {
              var locationId = loyalty.location;
              loyalty.location = dataSnapshot.val();
              loyalty.location.id = locationId;
              loyalty.location.distance = Geo.getDistance(loyalty.location.l[0], loyalty.location.l[1]).toFixed(1) + ' miles';
              $scope.$apply();
            });
          });
        });

        this.showCoupons = function () {
          this.coupanlist = true;
          var loyaltyElement = angular.element( document.querySelector( '#btnloyalty' ) );
          var couponElement = angular.element( document.querySelector( '#btncoupan' ) );
          loyaltyElement.removeClass('btnactive');
          loyaltyElement.addClass('btnNormal');
          couponElement.removeClass('btnNormal');
          couponElement.addClass('btnactive');
        };

        this.showLoyalty = function () {
          this.coupanlist = false;
          var loyaltyElement = angular.element( document.querySelector( '#btnloyalty' ) );
          var couponElement = angular.element( document.querySelector( '#btncoupan' ) );
          loyaltyElement.removeClass('btnNormal');
          loyaltyElement.addClass('btnactive');
          couponElement.removeClass('btnactive');
          couponElement.addClass('btnNormal');
        };

        this.findOneCoupan = function (coupan) {
          dealData.currentDeal = coupan;
          $state.go('app.findOneDeal');
        };

        this.findOneLoyalty = function (loyalty) {
          dealData.currentDeal = loyalty;
          $state.go('app.findOneDeal');
        };

        this.getNumber = function(num){
          if(num){
            return new Array(num);
          }
          return new Array(0);
        };
      };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/deal/find/find-deal-directive.html'
      }
    }]);
