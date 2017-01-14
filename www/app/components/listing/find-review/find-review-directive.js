angular.module('healthyPlaces.listing')
  .directive('findReview', ['createReview', '$firebaseArray', 'BACKEND_URL', 'Session', '$ionicPopup', '$state',
    function(createReview, $firebaseArray, BACKEND_URL, Session, $ionicPopup, $state) {
      var ctrl = function() {
        var vm = this;
        
        if (this.listing) {
          this.listing.reviews = $firebaseArray(new Firebase(BACKEND_URL + "locations/" + this.listing.id + '/reviews'));
        }

        vm.addReview = function(){
          if(!Session.isAuth('Please login to add ratings.')){
            return;
          }
          createReview.show(vm.listing);
          vm.listing.reviews = $firebaseArray(new Firebase(BACKEND_URL + "locations/"+vm.listing.id+'/reviews'));
        };

        vm.length = function(reviews){
          var i = 0;
          angular.forEach(reviews, function(){
            i++;
          });
          return i;
        };
      };
      return {
        controllerAs: 'vm',
        scope: {
          listing: '='
        },
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/listing/find-review/find-review-directive.html'
      }
    }]);
