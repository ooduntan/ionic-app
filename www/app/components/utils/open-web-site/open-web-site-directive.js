angular.module('healthyPlaces.utils')
  .factory('openWebSite', [function() {

    return {
      scope: {
        openWebSite: '@'
      },
      link: function(scope, element, attr){
        element.bind('click', function(){
          console.log(scope.openWebSite);
          if(scope.openWebSite.indexOf('http://') === -1){
            scope.openWebSite = 'http://'+scope.openWebSite;
          }
          window.open(encodeURI(scope.openWebSite), '_system', 'location=yes');
        });
      },

      withUrl: function(url) {
        console.log(url);
        if(url.indexOf('://') === -1){
          url = 'http://'+url;
        }
        window.open(encodeURI(url), '_system', 'location=yes');
      }
    }
  }]);
