angular.module('healthyPlaces.user')
  .factory('User', ['$q', 'BACKEND_URL', '$firebaseArray', '$firebaseAuth', function($q, BACKEND_URL, $firebaseArray, $firebaseAuth){

    function User(user){
      var _this = this;
      this.uid = user.uid;
      this.token = user.token;
      /*      this.email = user.password.email || '';
      this.picture = user.password.profileImageURL || '';*/
      this.favoriteListings = $firebaseArray(new Firebase(BACKEND_URL + "users/"+this.uid+'/favorite_listings'));
      this.stampsRef = new Firebase(BACKEND_URL + "users/"+this.uid+'/stamps');
      this.stamps = {};
      this.stampsRef.on('value', function(snap){
        if(snap.val()){
          _this.stamps = snap.val();
        }
      });
      if(user.facebook && user.facebook.email){
        var fredNameRef = new Firebase(BACKEND_URL + "users/"+this.uid);
        fredNameRef.update({ email: user.facebook.email });
      }
    }

    User.prototype.findFavoriteListings = function(){
      var favorites = [];
      angular.forEach(this.favoriteListings, function(listing){
        favorites.push(listing.$value);
      });
      return favorites;
    };

    User.prototype.indexOfListing = function(listingId){
      for(var i = 0 ; i < this.favoriteListings.length ; i++){
        if(this.favoriteListings[i].$value == listingId){
          return i;
        }
      }
      return -1;
    };

    User.prototype.isFavorite = function(listingId){
      return this.indexOfListing(listingId) > -1;
    };

    User.prototype.toggleFavorite = function(listingId){
      var vm = this;
      if(this.isFavorite(listingId)){
        vm.favoriteListings.$remove(vm.indexOfListing(listingId));
      }else{
        vm.favoriteListings.$add(listingId);
      }
    };

    User.prototype.toJSON = function() {
      return JSON.stringify({
        uid: this.uid,
        token: this.token,
        email: this.email,
        picture: this.picture
      });
    };

    User._randomize = function() {

      var random = '';
      var values = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
      var passwordLength = 10;

      for (var i = 0; i < passwordLength; i++) {
        var position = Math.floor(Math.random() * values.length);
        random += values.charAt(position);
      }

      return random;
    };

    User.updatePassword = function(email, oldPassword, newPassword){
      var deferred = $q.defer();

      var ref = new Firebase(BACKEND_URL);
      ref.changePassword({
        email       : email,
        oldPassword : oldPassword,
        newPassword : newPassword
      }, function(error) {
        if (!error) {
          console.log("Password changed successfully");
          deferred.resolve();
        } else {
          console.log("Error changing password:", error);
          deferred.reject();
        }
      });
      return deferred.promise;
    };

    User.prototype.getStamp = function(deal){
//      console.log(this.stamps[deal.id]);

      if(angular.isUndefined(this.stamps[deal.id])){
        return 0;
      }
      return parseInt(this.stamps[deal.id]);
    };

    User.prototype.setStamp = function(deal){
      var oldValue = parseInt(this.stamps[deal.id]) || 0;
      var newValue = (oldValue + 1) % parseInt(deal.stamp);
      this.stampsRef.child(deal.id).set(newValue);
      this.stamps[deal.id] = newValue;
    };

    User.create = function(email) {
      var deferred = $q.defer();
      var ref = new Firebase(BACKEND_URL);
      ref.createUser({
        email    : email,
        password : User._randomize()
      }, function(error, userData) {
        if (error) {
          // e.g. response:
          // code:"EMAIL_TAKEN"
          // details:undefined
          // message:"The specified email address is already in use."
          // stack:"Error: The specified email address is already in use.↵    at http://localhost:8100/lib/firebase/firebase.js:157:352↵    at XMLHttpRequest.e.onreadystatechange (http://localhost:8100/lib/firebase/firebase.js:141:309)"

          console.log("EMAIL LOGIN ERROR: " + error.message);
          deferred.reject();
          return deferred.promise;
        } else {
        //  e.g. response:  {uid: "560cbda9-1fce-48fd-ac01-bb0bd2e38395"}
          vm.uid = userData.uid;

        }

        // ref.resetPassword({
        //   email : email
        // }, function(error) {
        //   if (!error) {
        //     deferred.resolve();
        //   } else {
        //     deferred.reject();
        //     console.log("Error sending password reset email:", error);
        //   }
        // });
      });
      return deferred.promise;
    };

    return User;
  }]);

