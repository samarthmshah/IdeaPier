var restify = require('restify');
var config = require('./config');
var builder = require('botbuilder');
var strings = require('./helpers/strings.js');
var WordPOS = require('wordpos'),

wordpos = new WordPOS();

// Setup Restify Server
var server = restify.createServer();
var bodyParser = require('restify-plugins').bodyParser;
var fullRes = require('restify-plugins').fullResponse;
var queryParser = require('restify-plugins').queryParser;

var topicCtrl = require('./controllers/topicController.js');


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
var bot = new builder.UniversalBot(connector, [
    (session) => {
        session.send(strings.getGreeting('Sam'));
        session.beginDialog('interests');
    }
]);

bot.dialog('interests', [
    (session) => {
        builder.Prompts.text(session, strings.interests);
    }, 
    (session, results) => {
        session.dialogData.interest = results.response;
        if(results.response) {
            wordpos.getNouns(results.response, (nouns) => {  
                console.log(nouns);
                session.send("Let me see.");
                channelNames = [];
                nouns.forEach((noun) => {
                    channelNames = channelNames.concat(topicCtrl.getTopicsBySyn( {"topic": noun} ));
                });
                var found = true;
                if(found) {
                    session.send(strings.channelFound);
                    // Add user to channel
                } else {
                    session.send(strings.channelNotFound);
                    session.send(strings.addToChannelQuestion(nounString1[0]));
                    //Add channel and add user to channel
                }
            //             session.send(strings.addToChannel(session.dialogData.interest));
            //         } else {
            //             session.send(strings.cannotUnderstand);
            //         }
            });    
        } else {
            session.send("Please write someting"); 
        }
        session.endDialogWithResult(results);                  
    }
]);
