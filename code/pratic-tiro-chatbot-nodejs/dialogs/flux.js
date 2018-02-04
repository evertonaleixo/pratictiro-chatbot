var builder = require('botbuilder');

exports.flux = bot => {
    bot.dialog('flux', [
        function (session) {
            builder.Prompts.choice(session, 'Por onde começamos??', ["Inscrição","Dúvidas"], { listStyle: builder.ListStyle.button });
        },
        function (session, result) {
            console.log(result)
            session.endDialog('Então vamos lá!!.');
            if(result.response.index == 0) {
                session.beginDialog('pre-register');
            } else {
                session.beginDialog('faq');
            }
        }
    ]);
}