angular.module('healthyPlaces.utils').factory('Geo', ['$q', function($q) {

    function Geo() {
        this.currentPosition = {
            lat: 25.761680,
            lng: -80.191790
        };
    }

    Geo.prototype.refreshLocation = function() {
        var deferred = $q.defer();
        var vm = this;
        navigator.geolocation
            .getCurrentPosition(
              function (position) {
                var distance = vm.getDistance(position.coords.latitude, position.coords.longitude);
                if(distance < 50 * 1.61) {
                  vm.currentPosition.lat = position.coords.latitude;
                  vm.currentPosition.lng = position.coords.longitude;
                }
                deferred.resolve(vm.currentPosition);
              }, function(err) {
                console.log(err);
                deferred.resolve();
              });

        return deferred.promise;
    };

    Geo.prototype.getDistance = function(lat, lng, desLat, destLng){
      //TODO: Simpify this code with?: https://github.com/firebase/geofire-js/blob/master/docs/reference.md#geofiredistancelocation1-location2
      function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
      }

      function deg2rad(deg) {
        return deg * (Math.PI / 180);
      }
      return getDistanceFromLatLonInKm(desLat || this.currentPosition.lat, destLng || this.currentPosition.lng, lat, lng);
    };

    var geo = new Geo();
    return geo;
    }]);
