angular.module('healthyPlaces.listing')
  .directive('findHours', ['$state',
    function($state) {
      var ctrl = function() {

        var vm = this;
        var fullDays = {Sun:'Sunday', Mon:'Monday', Thues:'Tuesday', Wed:'Wednesday', Thur:'Thursday', Fri:'Friday', Sat:'Saturday'};
        vm.dates = {};
        angular.forEach(fullDays, function(value, key){
          vm.dates[value] = $state.params.dates[key];
        });

        vm.isToday = function(index){
          return moment().day() === index;
        };
      };
      return {
        controllerAs: 'vm',
        scope: {
        },
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/listing/find-hours/find-hours-directive.html'
      }
    }]);
