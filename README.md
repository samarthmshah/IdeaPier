# IdeaPier
Project for Microsoft OneWeek Hackathon 2017

* To install the Bot Builder for Node.js SDK and its dependencies, run the following commands inside your local project repo.
npm init

``
npm install --save botbuilder
npm install --save restify
``

* Download Bot Emulator 
https://github.com/Microsoft/BotFramework-Emulator/releases/tag/v3.5.29

* Run app.js

``
node app.js
``

* Start the emulator and connect your bot
    - Type http://localhost:3978/api/messages into the address bar. 
    (This is the default endpoint that your bot listens to when hosted locally.)
    - Click Connect. You won't need to specify Microsoft App ID and Microsoft App Password. 
    You can leave these fields blank for now. You'll get this information later when you register your bot.

* Test the bot by typing a message in the chat window inside the emulator, the bot should repeat the message.

* test

(Source - https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-quickstart)
