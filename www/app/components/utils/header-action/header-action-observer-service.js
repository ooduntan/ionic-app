angular.module('healthyPlaces.utils')
    .factory('headerActionObserver', ['$state',function($state){

        return {
            observer: {},
            clicked: function(){
                if(!this.observer[$state.current.name]){
                    return;
                }
                this.observer[$state.current.name]();
            },
            watch: function(func){
                this.observer[$state.current.name] = func;
            }
        };
    }]);
