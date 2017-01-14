angular.module('healthyPlaces.listing')
  .factory('createReview', ['$ionicPopup', '$rootScope', '$firebaseArray', 'BACKEND_URL', function($ionicPopup, $rootScope, $firebaseArray, BACKEND_URL) {
    return {
      show: function(listing){
        var scope = $rootScope.$new(true);
        scope.data = {rate: 0, title:""};

        $ionicPopup.show({
          template: '<textarea type="text" ng-model="data.title" rows="3" maxlength="150"></textarea><span>{{data.title.length}} / 150</span><p><stars-input style="text-align: center;" ng-model="data.rate"></stars-input></p>',
          cssClass: 'Location-detail',
          title: 'ADD REVIEW',
          subTitle: 'Please add a comment about your experience here.',
          scope: scope,
          buttons: [{
            text: '<b>SAVE</b>',
            type: 'button-royal button-save',
            onTap: function(e) {
              scope.createdAt = moment().format();

              listing.reviews.$add({title: scope.data.title, rate: scope.data.rate, createdAt: scope.createdAt});

              var rate = scope.data.rate;
              for(var i=0; i < listing.reviews.length; i++){
                rate += listing.reviews[i].rate;
              }
              listing.rate = (rate / (listing.reviews.length + 1));

              var listingRef = new Firebase(BACKEND_URL + 'locations/' + listing.id);
              listingRef.update({rate: listing.rate});
            }
          }, {
            text: '<b>CANCEL</b>',
            type: 'button-custom button-royal'
          }]
        });
      }
    }
  }]);
