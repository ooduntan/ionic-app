angular.module('healthyPlaces.listing')
  .directive('findOneListing', ['$stateParams', '$ionicLoading', '$compile', 'openWebSite', 'Restaurant', '$ionicPopup', '$firebaseObject', 'Firebase', '$filter', '$firebaseArray', 'BACKEND_URL', 'Color', 'Geo', 'listingData', '$state',
    function($stateParams, $ionicLoading, $compile, openWebSite, Restaurant, $ionicPopup, $firebaseObject, Firebase, $filter, $firebaseArray, BACKEND_URL, Color, Geo, listingData, $state) {
      var ctrl = ['$scope',function($scope) {
        var vm = this;

        this.showFullDescription = false;
        this.toggleShowFullDescription = function(){
          this.showFullDescription = !this.showFullDescription;
        };

        $scope.goCoupon = function(couponId){
          $state.go('app.findOneDeal', {coupon: couponId});
        };

        vm.goHours = function() {
          $state.go('app.findHours', {dates: $scope.formdata.hours});
        };

        vm.goWebsite = function(url) {
          openWebSite.withUrl(url);
        };

        var locid = $stateParams.locid;
        var obj = $firebaseObject(new Firebase(BACKEND_URL + 'locations/' + locid));
        listingData.current = null;
        $scope.colorForCategory = function(category) {
          return Color.colorForCategory(category);
        };

          obj.$loaded().then(function(data) { // retriving categories and subCategories
            if (obj.location && obj.location.length) {
              $scope.map = loadMap(data.location);
            }

            $scope.formdata = data;
            if($scope.formdata.location){
              if(ionic.Platform.isAndroid()){
                $scope.goNativeMap = 'geo:'+ $scope.formdata.location[0] +','+ $scope.formdata.location[1]+'?q='+ $scope.formdata.location[0] +','+$scope.formdata.location[1];
              }else{
                $scope.goNativeMap = 'http://maps.apple.com/?daddr='+ $scope.formdata.location[0] +','+ $scope.formdata.location[1];
              }
              $scope.formdata.distance = getDistanceFromLatLonInKm(25.761680, -80.191790, data.l[0], data.l[1]).toFixed(1) + ' miles'; // TODO remove fixed and set with current lat, lang
            }
            $scope.tagsinfo = [];
            angular.forEach(data.categories, function(value, key) {
              var categoryObj = $firebaseObject(new Firebase(BACKEND_URL + 'categories/' + value));
              categoryObj.$loaded().then(function(snap) {
                $scope.tagsinfo.push({value: snap.name, color: $scope.colorForCategory(snap.id)});
                angular.forEach(snap.subCategories, function(value, key) {
                  if ((data.subCategories) && (data.subCategories.indexOf(key) != -1)) {
                    $scope.tagsinfo.push({value: value, color: $scope.colorForCategory(snap.id)});
                  }
                });

              });
            });
            $scope.calcHoursStatus($scope.formdata.hours);
            if(angular.isUndefined($scope.formdata.rate)){
              $scope.formdata.rate = 0;
            }
            $scope.$watch(function(){
              return $scope.formdata.rate;
            }, function(){
              $scope.stars = [];
              $scope.userRating = $scope.formdata.rate;
              if($scope.userRating == 0) {return;}

              for (var i = 0; i < 5; i++) {
                if(i < $scope.userRating){
                  $scope.stars.push("ion-ios-star");
                }else{
                  $scope.stars.push("ion-ios-star-outline");
                }
              }
            });
            listingData.current = $scope.formdata;
          })
            .catch(function(error) {
              console.error("Error:", error);
            });

          $scope.reviewdata = Restaurant.reviewesdata();
          $scope.reviewstar = [];
          $scope.reviewrating = 5;
          for (var i = 0; i < 5; i++) {
            if (i > $scope.reviewrating) {
              $scope.reviewstar.push("ion-ios-star");
            } else {
              $scope.reviewstar.push("ion-ios-star-outline");
            }
          }
          //$ionicSideMenuDelegate.canDragContent(false);

          function loadMap(loc) {
            var myLatlng = new google.maps.LatLng(loc[0], loc[1]);

            var mapOptions = {
              center: myLatlng,
              zoom: 16,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            var noPoi = [
              {
                featureType: "poi",
                stylers: [
                  {visibility: "off"}
                ]
              },
              {
                featureType: "transit",
                stylers: [
                  { visibility: "off" }
                ]
              }
            ];
            map.setOptions({styles: noPoi});

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
              content: compiled[0]
            });

            var marker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              title: ''
            });
            marker.setIcon("img/Pin3.svg");
            google.maps.event.addListener(marker, 'click', function () {
              //infowindow.open(map,marker);
            });
            return map;
          }


          $scope.init = function() {
            //$scope.map = loadMap();
          };
          // google.maps.event.addDomListener(window, 'load', initialize);

          $scope.centerOnMe = function() {
            if (!$scope.map) {
              return;
            }

            $scope.loading = $ionicLoading.show({
              content: 'Getting current location...',
              showBackdrop: false
            });

            Geo.refreshLocation().then(function(position){
              $scope.map.setCenter(new google.maps.LatLng(position.lat, position.lng));
              $scope.loading.hide();
            });
          };

          $scope.clickTest = function() {
            alert('Example of infowindow with ng-click')
          };


          $scope.items = [{
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }];

          $scope.dialPhoneNumber = function(phoneNumber){
            var num = "tel:"+phoneNumber.replace(/[^\d\+]/g,"");
            window.open(num, '_system', 'location=yes');
          };

          $scope.openNativeMap = function(formdata) {
            var addressStr = formdata.street + ", " + formdata.city + ", " + "FL" + ", " + formdata.zipcode;
            launchnavigator.navigate(addressStr);
          };

          moment.tz.add('America/New_York|EST EDT|50 40|0101|1Lz50 1zb0 Op0');
          var fullDays = {'Sunday':'Sun', 'Monday':'Mon', 'Tuesday':'Tues', 'Wednesday':'Wed', 'Thursday':'Thur', 'Friday':'Fri', 'Saturday':'Sat'};

          var locationDate = moment.tz("America/New_York");
          var locationDay =  fullDays[locationDate.format('dddd')];
          var locationTomorrowDate = moment.tz("America/New_York").add(24,'hours');
          var locationTomorrowDay =  fullDays[locationTomorrowDate.format('dddd')];

          var getOneDaysTime = function(date, dayData, which) {
            var thisTime = moment(date);
            // if (dayData == null) return thisTime.startOf('day'); //TODO: This won't work because it will show opening at midnight for closed days

            thisTime.startOf('day').add(dayData[which]["hour"],'hours').add(dayData[which]["minute"],'minutes');
            if ((dayData[which]["time"] == 'pm') && (dayData[which]["hour"] != '12')){
              thisTime.add(12, 'hours');
            }

            return thisTime;
          };

          var cleanHours = function(hours) {
            if (hours["Thues"]) { hours["Tues"] = hours["Thues"];}

            //TODO: handle missing today case
            //TODO: handle missing tomorrow case
            //TODO: combine above to all missing days (provide blank data for any missing day?

            return hours;
          };

          $scope.calcHoursStatus = function(hours) {
            if (hours) {
              hours = cleanHours(hours);

              var todayData = hours[locationDay];
              if(!todayData || todayData.status === 'closed'){
                $scope.hoursCurrentStatus = "Currently closed";
                $scope.hoursNextStatus = "";
                return;
              }
              var todayOpenTime = getOneDaysTime(locationDate, todayData, "open");
              var todayCloseTime = getOneDaysTime(locationDate, todayData, "close");

              var isOpen = (locationDate >= todayOpenTime) && (locationDate <= todayCloseTime);
              var isPreOpen = (locationDate < todayOpenTime);
              var isPostOpen = (locationDate > todayCloseTime);
              if (todayCloseTime < todayOpenTime) { //NOTE: Special case for post-midnight close.
                isOpen = (locationDate >= todayOpenTime);
                isPreOpen = (locationDate < todayOpenTime);
                isPostOpen = false;
              }

              if (isOpen) {
                $scope.hoursCurrentStatus = "Currently open";
                $scope.hoursNextStatus = "Closes at " + todayCloseTime.format('h:mm a');
              } else if (isPreOpen) {
                $scope.hoursCurrentStatus = "Currently closed";
                $scope.hoursNextStatus = "Opens at " + todayOpenTime.format('h:mm a');
              } else if (isPostOpen) {
                $scope.hoursCurrentStatus = "Currently closed";
                var tomorrowData = hours[locationTomorrowDay];
                if(tomorrowData){
                  var tomorrowOpenTime = getOneDaysTime(locationTomorrowDate, tomorrowData, "open");
                  $scope.hoursNextStatus = "Opens at " + tomorrowOpenTime.format('h:mm a');
                }else{
                  $scope.hoursNextStatus = "";
                }
              } else {
                $scope.hoursCurrentStatus = "Currently closed";
                $scope.hoursNextStatus = "";
              }
            }
          };

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

      }];
      return {
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/listing/find-one/find-one-listing-directive.html'
      }
    }]);
