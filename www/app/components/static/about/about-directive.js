angular.module('healthyPlaces.static')
  .directive('about', [
    function() {
      var ctrl = function() {
        this.data = [{
          text: '',
          imgsrc1:'img/TopGraphic.png',
          imgsrc2:'img/Oval15.png'
        }];
      };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/static/about/about-directive.html'
      }
    }]);
