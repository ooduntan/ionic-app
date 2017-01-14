angular.module('healthyPlaces.category')
  .factory('Categories', function() {

    var callbacks = [];
    var selectedCategories = [];
    var selectedSubCategories = [];
    var text = '';

    function set(categories, subCategories) {
      selectedCategories = categories;
      selectedSubCategories = subCategories;

      callbacks.forEach(function(callback) {
        callback();
      })
    }

    function get() {
      return {
        text: text,
        filterCategories: selectedCategories,
        filterSubCategories: selectedSubCategories
      };
    }

    function onChange(callback) {
      callbacks.push(callback);
    }

    function setText(input){
      text = input;
      callbacks.forEach(function(callback) {
        callback();
      })
    }

    return {
      set: set,
      get: get,
      setText: setText,
      onChange: onChange,
      categories: null,
      category: null,
      numberOfSelectedCategories: function(){
        return selectedCategories.length + selectedSubCategories.length;
      },
      filter: function(listings){
        var result = [];
        angular.forEach(listings, function(value){
          var pass = false;
          angular.forEach(value.categories, function(category){
            if(selectedCategories.indexOf(category) > -1){
              pass = true;
            }
          });
          angular.forEach(value.subCategories, function(subCategory){
            if(selectedSubCategories.indexOf(subCategory) > -1){
              pass = true;
            }
          });
          if(selectedCategories.length === 0 && selectedSubCategories.length === 0){
            pass = true;
          }
          if(pass){
            result.push(value);
          }
        });

        return result;
      }
    };
  }
);
