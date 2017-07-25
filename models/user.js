// Model for a User 
module.exports = (function userSchema () {
 
  var mongoose = require('../db').mongoose;
 
  var schema = {
    username: {type: String, required: true},
    topics: {type: Array, required: false},
    channels: {type: Array, required: false}
  };
  var collectionName = 'users';
  var userSchema = new mongoose.Schema(schema);
  var User = mongoose.model(collectionName, userSchema);
  
  return User;
})();