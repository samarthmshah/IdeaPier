var restify = require('restify');
var builder = require('botbuilder');
var strings = require('./helpers/strings.js');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

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
        // search mongo for the interest.
        // var found = mongo.search.interest(session.dialogData.interest);
        var found = true;
        if(found) {
            session.send(strings.channelFound);
        } else {
            session.send(strings.channelNotFound);
            // create one
        }
        session.send(strings.addToChannel(session.dialogData.interest));
        // insert channel and add channel to users list
        session.endDialogWithResult(results);
    }
]);