angular
  .module('healthyPlaces.listing')
  .controller('PopupCtrl', function($scope, $filter, Color, $state) {
    var ctrl = this;

    ctrl.id = $scope.currentLocation.id;
    ctrl.i = $scope.currentLocation.i;
    ctrl.name = $scope.currentLocation.name;
    ctrl.hours = $scope.currentLocation.hours;
    ctrl.distances = $scope.currentLocation.distances.toFixed(1);
    ctrl.picture = $scope.currentLocation.picture;
    ctrl.categories = $scope.currentLocation.categories;

    ctrl.getStatus = getStatus;
    ctrl.colorForCategory = colorForCategory;
    ctrl.goDetails = function(){
      $state.go('app.locdetali', {locid: ctrl.id});
    };
    function getStatus(hours) {
      //TODO: Refactor hours handling/calc code from locationDetail.js into a service for use here. (WAS: Fix this to show open or closed based on current time!!!)
      return "";
    }

    function colorForCategory (category) {
      return Color.colorForCategory(category);
    }
  })
  .directive('popup',[ 'Color',
    function (Color) {

  return {
    restrict: 'E',
    templateUrl: 'app/components/listing/components/popup/popup.html',
    controller: 'PopupCtrl',
    bindToController: true,
    controllerAs: 'ctrl',
    scope: false
  }
}]);
