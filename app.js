var restify = require('restify');
var builder = require('botbuilder');

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
        session.send('Welcome to the IdeaPeer bot.');
        session.beginDialog('interests');
    }
]);

bot.dialog('interests', [
    (session) => {
        builder.Prompts.text(session, 'What are your interests?');
    }, 
    (session, results) => {
        session.dialogData.interest = results.response;
        // search mongo for the interest.
        // var found = mongo.search.interest(session.dialogData.interest);
        var found = true;
        if(found) {
            session.send("Sweet! Found a channel for you.");
        } else {
            session.send("Couldn't find an existing channel.");
            // create one
        }
        session.send('Adding you to the channel: %s', session.dialogData.interest);
        // insert channel and add channel to users list
        session.endDialogWithResult(results);
    }
]);