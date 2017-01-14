angular.module('healthyPlaces.utils')
    .directive('headerAction', ['headerActionObserver', '$state', '$timeout',function(headerActionObserver, $state, $timeout) {

        return {
            scope: {},
            link: function(scope, element, attr){
                element.bind('click', function(){
                    headerActionObserver.clicked();
                });
            }
        }
    }]);
