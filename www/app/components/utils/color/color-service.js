angular.module('healthyPlaces.utils').factory('Color', ['$q', function($q) {

  function Color() {
  }

  var categories = {
    "4kz2ZxVh3x": {
      id: "4kz2ZxVh3x",
      color: "#73C14F",
      name: "Grocery"
    },
    "4yZA-e4hhl": {
      id: "4yZA-e4hhl",
      color: "#D55486",
      name: "health & beauty"
    },
    "EJgqGlV3ng": {
      id: "EJgqGlV3ng ",
      color: "",
      name: "gardening"
    },
    "EyDZg43hg": {
      id: "EyDZg43hg",
      color: "#5A2B83",
      name: "Dining"
    },
    "VJXuZgE23e": {
      id: "VJXuZgE23e",
      color: "#55B2DC",
      name: "fitness"
    },
    "N1WhWe4h2e": {
      id: "N1WhWe4h2e",
      color: "#FAA83F",
      name: "juices & smoothies"
    }
  };

  //TODO: Create companion .html to automatically use this fucntion.
  Color.prototype.colorForCategory = function(category) {
    var foundCategory = categories[category];

    if (!foundCategory)
      return "#000000";
    else
      return foundCategory.color;
  };

  var color = new Color();
  return color;
}]);
