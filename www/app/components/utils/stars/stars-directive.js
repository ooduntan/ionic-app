angular.module('healthyPlaces.utils')
  .directive('stars', function() {
    var ctrl = function($scope) {

      var vm = this;
      vm.rates = [];
      var starWatch = $scope.$watch(function(){
        return vm.rate;
      }, function(){
        if(vm.rate){
          starWatch();
          for (var i = 0; i < 5; i++) {
            if (i < vm.rate) {
              vm.rates.push("ion-ios-star");
            } else {
              vm.rates.push("ion-ios-star-outline");
            }
          }
        }
      });

    };
    return {
      bindToController: true,
      controllerAs: 'vm',
      scope: {
        rate: '@'
      },
      controller: ctrl,
      templateUrl: 'app/components/utils/stars/stars-directive.html'
    }
  });
