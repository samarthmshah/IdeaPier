var restify = require('restify');
var config = require('./config');
var server = restify.createServer();
var bodyParser = require('restify-plugins').bodyParser;
var fullRes = require('restify-plugins').fullResponse;
var queryParser = require('restify-plugins').queryParser;
var builder = require('botbuilder');
 
server.use(fullRes());
server.use(bodyParser());
server.use(queryParser());
 
server.listen(config.port, function() {
  console.log('server listening on port number', config.port);
  
});
var routes = require('./routes')(server);


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});