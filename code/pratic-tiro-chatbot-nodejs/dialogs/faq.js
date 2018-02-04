var builder = require('botbuilder');

exports.faq = bot => {
    bot.dialog('faq', [
        function (session) {
            builder.Prompts.text(session, 'Qual a sua dúvida??');
        },
        function (session, result) {
            console.log(result);
        }
    ]);
}