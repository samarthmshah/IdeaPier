// all functionalities of a User

function userController () {
  var User = require('../models/user');
  
  // create new user
  this.createUser = function(body){
        this.createUserHttp({body:body});
    }
  // Creating New User via Http
  this.createUserHttp = function (req, res, next) {
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
 

 // get all info for all users
  this.getUsers = function(){
        this.getUsersHttp();
    }
  // Get all info for all users
  this.getUsersHttp = function (req, res, next) {
 
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


  // get info for single User
  this.getUser = function (params){
    getUserHttp({params:params})
  };
  // get info for single user via Http
  this.getUserHttp = function (req, res, next) {
        const userID = req.params._id;

        User.find({
            _id: _id
        }, function (err, result) {
            if (err) {
                console.log(err);
                return res.send({'error': err});
            } else {
                return res.send({'user Details': result});
            }
        });
    };
 
return this;
 
};
 
module.exports = new userController();