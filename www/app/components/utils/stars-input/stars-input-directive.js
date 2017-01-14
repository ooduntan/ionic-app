angular.module('healthyPlaces.utils')
  .directive('starsInput', function() {
    var ctrl = function() {

      var vm = this;

      vm.init = function() {
        vm.stars = [];
        vm.initState();
      };

      vm.initState = function() {
        for (var i = 0; i < 5; i++) {
          var star = {
            rank: i,
            filled: false
          };
          vm.stars.push(star);
        }

      };

      vm.clicked = function(index) {
        for (var i = 0; i < 5; i++) {
          if (index >= i) {
            vm.stars[i].filled = true;
          }
        }
        vm.ngModel = index+1;
      };

      vm.init();
    };
    return {
      bindToController: true,
      controllerAs: 'vm',
      scope: {
        ngModel: '='
      },
      controller: ctrl,
      templateUrl: 'app/components/utils/stars-input/stars-input-directive.html'
    }
  });
