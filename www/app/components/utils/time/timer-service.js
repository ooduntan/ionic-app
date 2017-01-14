angular.module('healthyPlaces.utils').factory('timer', ['$interval',function($interval) {
    var timer = {
        wake: {
            counter: 0
        },
        watch: function(){
            var _this = this;
            $interval(function(){
                _this.wake.counter++;
            }, 10000);
        }
    };
    timer.watch();
    return timer;
}]);
