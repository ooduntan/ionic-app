angular.module('healthyPlaces.listing')
  .directive('shareListing', ['listingData',function(listingData) {

    return {
      scope: {},
      link: function(scope, element, attr){
        element.bind('click', function(){
          window.plugins.socialsharing.share("Check out " + listingData.current.name + "! by Healthy Places");
        });
      }
    }
  }]);
