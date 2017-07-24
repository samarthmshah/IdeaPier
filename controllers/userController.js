// all functionalities of a User

function userController () {
  var User = require('../models/user');
  
  // Creating New User
  this.createUser = function (req, res, next) {
    var username = req.body.username;
    var topics = req.body.topics;
    
    User.create({username:username, topics:topics}, function(err, result) {
      if (err) {
        console.log(err);
        return res.send({'error':err}); 
      }
      else {
        return res.send({'result':result,'status':'successfully saved'});
      }
    });
  };
 
  // Get all User info
  this.getUser = function (req, res, next) {
 
    User.find({}, function(err, result) {
      if (err) {
        console.log(err);
        return res.send({'error':err}); 
      }
      else {
        return res.send({'user Details':result});
      }
    });
  };
 
return this;
 
};
 
module.exports = new userController();