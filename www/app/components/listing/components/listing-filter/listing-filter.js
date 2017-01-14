angular.module('healthyPlaces.listing').filter('listingFilter', function($filter) {

  //RESEARCH: https://github.com/KamBha/angular-disclosure-panel
  return function(input) {
    var featuredListings = [];
    var normalListings = [];
    angular.forEach(input, function(listing){
      if(listing.featured){
        featuredListings.push(listing);
      }else{
        normalListings.push(listing);
      }
    });
    var orderedListing = $filter('orderBy')(normalListings,'distance');
    var output = featuredListings.concat(orderedListing);
    return output;

  }

});
