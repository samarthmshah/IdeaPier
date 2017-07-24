module.exports = function(app) {
  var user = require('./controllers/userController');

  app.post('/createUser', user.createUser); 
  app.get('/getUsers', user.getUser);  

  app.get('/', function(req, res, next) {
    return res.send("WELCOME TO IDEA PIER");
  });
};