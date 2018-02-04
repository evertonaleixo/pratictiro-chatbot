var PreRegister = require('./dialogs/pre-register.js');
var Flux = require('./dialogs/flux.js');
var Faq = require('./dialogs/faq.js');

var restify = require('restify');
var builder = require('botbuilder');
var inMemoryStorage = new builder.MemoryBotStorage();

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Crie um chat conector para se comunicar com o Bot Framework Service
var connector_id = {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
};

connector_id = {};
var connector = new builder.ChatConnector(connector_id);

// Endpoint que irá monitorar as mensagens do usuário
server.post('/api/messages', connector.listen());

// Recebe as mensagens do usuário e responde repetindo cada mensagem (prefixado com 'Você disse:')
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Você disse: %s", session.message.text);
    if(session.message.text.startsWith("quero")) {
        session.beginDialog("pre-register");
    }
}).set('storage', inMemoryStorage);

PreRegister.preRegister(bot);
Flux.flux(bot);
Faq.faq(bot);

bot.on('conversationUpdate', function (message) {
    
    if (message.membersAdded && message.membersAdded.length > 0) {
        if(message.membersAdded[0].id == 'default-bot'){
            return;
        }
        var isGroup = message.address.conversation.isGroup;
        var txt = isGroup ? "Ola a todos!" : "Ola!";
        txt = txt + " Eu sou o T-800. Sou um Robo e novo funcionário da Pratic Tiro! Minha missão é esclarecer suas dúvidas e auxiliar os primeiros passos de seu treinamento."
        var reply = new builder.Message()
                .address(message.address)
                .text(txt);
        bot.send(reply);

        var prompt = new builder.PromptChoice('Por onde começaremos?', ["Tirar dúvidas","Inscrever"], { listStyle: builder.ListStyle.button })
        bot.beginDialog(message.address, "*:flux");
    } else if (message.membersRemoved) {
        // See if bot was removed
        var botId = message.address.bot.id;
        for (var i = 0; i < message.membersRemoved.length; i++) {
            if (message.membersRemoved[i].id === botId) {
                // Say goodbye
                var reply = new builder.Message()
                        .address(message.address)
                        .text("Obrigado! Até mais.");
                bot.send(reply);
                break;
            }
        }
    }
});