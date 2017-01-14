angular.module('healthyPlaces.event')
  .directive('findEvent', ['$rootScope', '$state', 'BACKEND_URL', 'eventData', 'Geo', '$timeout', '$firebaseArray', '$stateParams',
    function($rootScope, $state, BACKEND_URL, eventData, Geo, $timeout, $firebaseArray, $stateParams) {
      var ctrl = function($scope) {
        var vm = this;
        var rootRef = new Firebase(BACKEND_URL);

        this.findOne = function (event) {
          eventData.currentEvent = event;
          $state.go('app.findOneEvent');
        };

        vm.getFormattedDate = function(date, style) {
          return moment(date).format(style);
        };

        vm.sectionDateFormatted = function(date) {
          return moment(date, 'YYYY-MM').format('MMMM YYYY');
        };

        vm.dividerFunction = function(key){
          key = moment(key, 'YYYY-MM').format('MMMM YYYY');
          return key;
        };

        vm.getDistance = function(event) {
          var dist = "";
          if(event.location) {
            dist = Geo.getDistance(event.location.l[0], event.location.l[1]).toFixed(1) + ' miles';
          }
          return dist;
        };

        var today = moment(new Date()).format('YYYY-MM-DD');
        var events = $firebaseArray(rootRef.child('events').orderByChild('date').startAt(today));
        events.$loaded().then(function(data){
          vm.events2 = data;
        });

        if($stateParams.event) {
          $state.go('app.findOneEvent', {event: $stateParams.event});
        }

        };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/event/find/find-event-directive.html'
      }
    }]);
