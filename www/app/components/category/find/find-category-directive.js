angular.module('healthyPlaces.category')
  .directive('findCategory', ["$firebaseArray", "$state", "Categories", "BACKEND_URL", 'headerActionObserver',
    function($firebaseArray , $state, Categories, BACKEND_URL, headerActionObserver) {
      var ctrl = function() {
        var vm = this;
        if(Categories.categories == null){
          var list = $firebaseArray(new Firebase(BACKEND_URL).child('categories').orderByChild('weight'));
          list.$loaded().then(function(data) {
            angular.forEach(data, function(cat){
              cat.sub = [];
              angular.forEach(cat.subCategories, function(value, key){
                cat.sub.push({value: value, id: key});
              });
            });
            vm.categories = data;
            Categories.categories = vm.categories;
          });
//    $scope.selected = {};
          vm.category = {all: true};
          Categories.category = vm.category;
        }else{
          vm.categories = Categories.categories;
          vm.category = Categories.category;
        }

        headerActionObserver.watch(function () {
          var selectedCategories = [];
          var selectedSubCategories = [];
          angular.forEach(vm.categories, function(category){
            if(category.selected){
              selectedCategories.push(category.id);
            }
            angular.forEach(category.sub, function(sub){
              if(sub.selected){
                selectedSubCategories.push(sub.id);
              }
            });
          });

          Categories.set(selectedCategories, selectedSubCategories);
          $state.go('app.explore');
        });

        vm.toggle = function(category){
          if(angular.isUndefined(category.open)){
            category.open = true;
          }else{
            category.open = !category.open;
          }
        };


        vm.selectAll = function(){
          if(vm.category.all){
            for(var i = 0 ; i < vm.categories.length; i++){
              if(vm.categories[i].selected){
                vm.categories[i].selected = false;
              }
              if(vm.categories[i].sub){
                for(var j = 0 ; j < vm.categories[i].sub.length; j++){
                  if(vm.categories[i].sub[j].selected){
                    vm.categories[i].sub[j].selected = false;
                  }
                }
              }
            }
          }
        };

        vm.selected = function(selected, obj, type){
          if(selected){
            if(type == 'cat'){
              angular.forEach(obj.sub, function(sub){
                sub.selected = true;
              });
            }else{
              var all = true;
              angular.forEach(obj.sub, function(sub){
                if(!sub.selected){
                  all = false;
                }
              });
              if(all){
                obj.selected = true;
              }
            }
            vm.category.all = false;
          }else{
            if(type == 'cat'){
              angular.forEach(obj.sub, function(sub){
                sub.selected = false;
              });
            }else{
              obj.selected = false;
            }
            for(var i = 0 ; i < vm.categories.length; i++){
              if(vm.categories[i].selected){
                vm.category.all = false;
                return;
              }
              if(vm.categories[i].sub){
                for(var j = 0 ; j < vm.categories[i].sub.length; j++){
                  if(vm.categories[i].sub[j].selected){
                    vm.category.all = false;
                    return;
                  }
                }
              }
            }
            vm.category.all = true;
          }
        };
      };
      return {
        controllerAs: 'vm',
        scope: {},
        bindToController: true,
        replace: false,
        controller: ctrl,
        templateUrl: 'app/components/category/find/find-category-directive.html'
      }
    }]);
