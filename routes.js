module.exports = function(app) {
  const user = require('./controllers/userController');
  const topic = require('./controllers/topicController');

  app.post('/createUser', user.createUser); 
  app.get('/getUsers', user.getUser);  

  app.post('/createTopic', topic.createTopic);
  app.get('/getTopic', topic.getTopic);
  app.get('./getTopicsBySyn', topic.getTopicsBySyn);

  app.get('/', function(req, res, next) {
    return res.send("WELCOME TO IDEA PIER");
  });
};