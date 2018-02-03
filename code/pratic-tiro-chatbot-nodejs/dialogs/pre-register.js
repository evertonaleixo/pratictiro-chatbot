var builder = require('botbuilder');

exports.preRegister = bot => {
    bot.dialog('pre-register', [
        function (session) {
            builder.Prompts.text(session, 'Qual o seu telefone de contato?');
        },
        function (session) {
            //session.dialogData.phone = results.response;
            builder.Prompts.confirm(session, 'Este numero tem Whatsapp?');
        },
        function (session) {
            //session.dialogData.isWhatsapp = results.response;
            builder.Prompts.confirm(session, 'Voce mora em Goiânia ou região próxima?');
        },
        function (session) {
            //session.dialogData.isWhatsapp = results.response;
            builder.Prompts.choice(session, 'Seu principal interesse seria em qual curso?', ["Basico Pistola","Manutenção","Calibres longos"], { listStyle: builder.ListStyle.button });
        },
        function (session) {
            //session.dialogData.isGyn = results.response;
            builder.Prompts.confirm(session, 'Vamos confirmar os seus dados? Telefone: '+session.dialogData.phone + '. ' + (session.dialogData.isWhatsapp? 'Tem ': 'Não tem ') + 'whatsapp. '+ (session.dialogData.isWhatsapp? 'Mora ': 'Não mora ') + 'em Goiânia ou região.');
        },
        function (session, results) {
            session.endDialog(`Obrigado! Entraremos em contato para mais detalhes.`);
        }
    ]);
}