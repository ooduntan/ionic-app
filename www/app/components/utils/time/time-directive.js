angular.module('healthyPlaces.utils').filter('pastDate', function () {
    return function (date) {
        return moment(date).fromNow();
    };
});

angular.module('healthyPlaces.utils').directive('time',
    ['timer',function(timer) {
        return function(scope, element, attrs) {

            var updateTime = function(){
                element.text(moment(attrs.time).fromNow());
            };
            updateTime();

            scope.$watch(function(){
                return attrs.time;
            }, function() {
                updateTime();
            });

            scope.$watch(function(){
                return timer.wake.counter;
            }, function() {
                updateTime();
            });
        };

    }]
);
