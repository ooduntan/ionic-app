angular.module('healthyPlaces.listing')
  .factory('Listing', ['$q', 'BACKEND_URL', 'Geo', function($q, BACKEND_URL, Geo){

    function Listing(){

    }

    Listing.findOne = function(id){
      var deferred = $q.defer();
      var ref = new Firebase(BACKEND_URL + 'locations/');
      ref.child(id).once('value', function(snapshot) {
        var current = snapshot.val();
        current.distance = Geo.getDistance(current.location[0], current.location[1]).toFixed(1) + ' miles';
        deferred.resolve(current);
      });
      return deferred.promise;
    };

    Listing.find = function(ids, index, results, cb){
      var _this = this;
      if(index == ids.length){
        cb(results);
      }else{
        this.findOne(ids[index]).then(function(listing){
          results.push(listing);
          _this.find(ids, index + 1, results, cb);
        });
      }
    };

    Listing.create = function(listing) {
      var deferred = $q.defer();
      var ref = new Firebase(BACKEND_URL + "suggested_locations/");
      ref.push(listing);
      deferred.resolve();
      return deferred.promise;
    };


    return Listing;
  }]);

