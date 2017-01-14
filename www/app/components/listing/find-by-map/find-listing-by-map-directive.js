angular.module('healthyPlaces.listing')
  .directive('findListingByMap', ['$state', 'Geo', 'BACKEND_URL', '$compile', 'Categories', '$filter',
    function($state, Geo, BACKEND_URL, $compile, Categories, $filter) {
      var ctrl = ['$scope',function($scope) {
        var vm = this;
        var openedInfoBox = null;
        vm.listings = [];
        vm.infobox = {};
        vm.markers = [];
        vm.map = new google.maps.Map(document.getElementById("exploremap"), {
          center: new google.maps.LatLng(Geo.currentPosition.lat, Geo.currentPosition.lng),
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
        });
        var GeoMarker = new GeolocationMarker(vm.map);

        vm.map.setOptions({styles: [
          {
            featureType: "poi",
            stylers: [
              { visibility: "off" }
            ]
          },
          {
            featureType: "transit",
            stylers: [
              { visibility: "off" }
            ]
          }
        ]});
        var geoQuery = null;
        vm.map.addListener('center_changed', function() {
          geoQuery.updateCriteria({
            center: [vm.map.getCenter().lat(), vm.map.getCenter().lng()]
          });
        });

        vm.map.addListener('zoom_changed', function() {
          if(vm.map.getZoom() <= 12){
            angular.forEach(vm.markers, function(marker){
              if(marker.featured === true){
                marker.icon = "img/Pin3.svg";
              }else{
                marker.icon = "img/pt.svg";
              }
            });
          }else{
            angular.forEach(vm.markers, function(marker){
              marker.icon = "img/Pin3.svg";
            });
          }
        });

        vm.goCurrentLocation = function(){
          vm.map.setCenter(new google.maps.LatLng(Geo.currentPosition.lat, Geo.currentPosition.lng));
        };

        var locationRef = new Firebase(BACKEND_URL + "locations/");
        var geoFireRef = new Firebase(BACKEND_URL + "_geofire/");
        var geoFire = new GeoFire(geoFireRef);


        var openInfoBox = function(marker){
          if (openedInfoBox != null) {
            vm.infobox[openedInfoBox].close();
          }
          openedInfoBox = marker.id;
          vm.infobox[marker.id].open(vm.map, marker);
        };

        var createMarker = function(current) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(current.l[0], current.l[1]),
            map: vm.map,
            id: current.id,
            distance: current.distance,
            icon: "img/pt.svg",
            featured: current.featured
          });

          if(vm.map.getZoom() <= 12){
            if(marker.featured === true){
              marker.icon = "img/Pin3.svg";
            }else{
              marker.icon = "img/pt.svg";
            }
          }else{
            marker.icon = "img/Pin3.svg";
          }
          vm.markers.push(marker);
          google.maps.event.addListener(marker, 'click', function(marker) {
            return function(){
              if(angular.isUndefined(vm.infobox[marker.id])){
                locationRef.child(marker.id).once("value", function(dataSnapshot) {
                  var current = dataSnapshot.val();
                  var popupScope = $scope.$new();
                  popupScope.currentLocation = {
                    id: current.id,
                    name: current.name,
                    hours: current.hours,
                    distances: marker.distance,
                    categories: current.categories
                  };
                  var infoBoxHtmlContent = $compile('<popup></popup>')(popupScope);

                  var pixelOffset = new google.maps.Size(-70, -80);
                  if(marker.icon == "img/pt.svg") {
                    pixelOffset = new google.maps.Size(-70, -66);
                  }

                  vm.infobox[marker.id] = new InfoBox({
                    content: infoBoxHtmlContent[0],
                    disableAutoPan: false,
                    maxWidth: 150,
                    buttons: {
                      close: {
                        show: 4
                      }
                    },
                    pixelOffset: pixelOffset,
                    zIndex: null,
                    boxStyle: {
                      width: "170px"
                    },
                    closeBoxMargin: "",
                    closeBoxURL: ""
                  });
                  openInfoBox(marker);
                });
              }else{
                openInfoBox(marker);
              }
            };
          }(marker));

        };

        var geoQueryListener = function(){
          geoQuery.on("key_entered", function(locationId, latLang, distance) {
            geoFireRef.child(locationId).once("value", function(dataSnapshot) {

              var current = dataSnapshot.val();
              current.distance = distance;
              current.stars = [];
              for (var j = 0; j < current.rate; j++) {
                current.stars.push("ion-star");
              }
              vm.listings.push(current);
              onFilterChange();
            });
          });
        };

        vm.map.addListener('idle', function() {
          if(geoQuery){
            geoQuery.updateCriteria({
              radius: Geo.getDistance(vm.map.getCenter().lat(), vm.map.getCenter().lng(), vm.map.getBounds().getNorthEast().lat(), vm.map.getBounds().getNorthEast().lng())
            });
          }else{
            geoQuery = geoFire.query({
              center: [Geo.currentPosition.lat, Geo.currentPosition.lng],
              radius: Geo.getDistance(vm.map.getCenter().lat(), vm.map.getCenter().lng(), vm.map.getBounds().getNorthEast().lat(), vm.map.getBounds().getNorthEast().lng())
            });
            geoQueryListener();
          }
        });


        var clearMarkers = function() {
          if (openedInfoBox != null){
            vm.infobox[openedInfoBox].close();
          }
          openedInfoBox = null;
          for (var i = 0; i < vm.markers.length; i++) {
            vm.markers[i].setMap(null);
          }
          vm.markers = [];
        };

        var reloadMarkers = function(listings) {
          clearMarkers();
          angular.forEach(listings, function(listing){
            createMarker(listing);
          });
        };

        var onFilterChange = function() {
          var newListings = Categories.filter(vm.listings);
          if(Categories.get().text.length > 0){
            var searchText = Categories.get().text.toLowerCase();

            newListings = newListings.filter(function(item) {
              return item.name.toLowerCase().includes(searchText);
            });
          }
          reloadMarkers(newListings);
        };

        Categories.onChange(onFilterChange);

      }];
      return {
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/listing/find-by-map/find-listing-by-map-directive.html'
      }
    }]);
