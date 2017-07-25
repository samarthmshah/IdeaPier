module.exports = function(app) {
  const user = require('./controllers/userController');
  const topic = require('./controllers/topicController');

  app.post('/createUser', user.createUserHttp); 
  app.get('/getUsers', user.getUsersHttp);  

  app.post('/createTopic', topic.createTopicHttp);
  app.get('/getTopic/:topic', topic.getTopicHttp);
  app.get('/getTopicsBySyn/:topic', topic.getTopicsBySynHttp);
  app.put('/addChannel', topic.addChannelIdForTopic);
  app.put('/addTopicToUser', topic.addTopicToUserHttp);

  app.get('/', function(req, res, next) {
    return res.send("WELCOME TO IDEA PIER");
  });
};