angular.module('healthyPlaces.listing')
.factory('Restaurant', function() {

    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var tags = [{
      id: 0,
      title: 'Dining'
    },{
      id: 1,
      title: 'Clean Meats'
    },
      {
        id: 2,
        title: 'Organic'
      },
      {
        id: 3,
        title: 'Vegan'
      },
      {
        id: 4,
        title: 'Vegetarian'
      }];

    var reviews = [{
      id: 0,
      title: 'Amazing gluten-free buns!!!',
      ago:'1 day ago'
    },{
      id: 1,
      title: 'Best Restaurant Ever!',
      ago:'3 day ago'
    },{
      id: 2,
      title: 'Amazing gluten-free buns!!!',
      ago:'5 day ago'
    }];
    return {
      tagsdata: function() {
        return tags;
      },
      reviewesdata: function() {
        return reviews;
      }
    };
  });
