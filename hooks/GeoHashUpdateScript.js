var list = $firebaseArray(new Firebase('https://hp-?dev.firebaseio.com/locations/'));
  list.$loaded().then(function(data) {
	console.log('data loaded');
	for (var i = 0; i < data.length; i++) {
	  var current = data[i];
	  console.log('locations : ' + i + ' :: ' + angular.toJson(current, ' '));

	  current.g = current.locationHash.g;
	  current.l = current.locationHash.l;
	  list[i] = current;
	  list.$save(i).then(function(ref) {
		console.log('updated sucessfully...');
		//ref.key() === list[2].$id; // true
	  }).catch(function(error) {
		console.log('at error ' + error);
	  });

	}
  });
