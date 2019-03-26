const prefix = process.env.prefix || require('../../bot-config.json').prefix;
const { setGuildLanguage, getAvailableLanguages } = require('../utils/language');
const { error } = require('../utils/customConsole');

const command = {
    name: "lang",
    commands: [prefix+"lang"],
    indexZero: true,
    enabled: false,
    run: async (client, message, language) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            const args = message.content.split(' ');
            const availableLanguages = await getAvailableLanguages();
            let langNotFound = true;
            for (let i in availableLanguages) {
                if (availableLanguages[i] == args[1]) {
                    langNotFound = false;
                    await setGuildLanguage(message.guild.id, availableLanguages[i]);
                    message.channel.send(require(`../lang/${args[1]}.json`).command.lang.success).catch(error);
                    break;
                }
            }
            if (langNotFound) {
                let LangList = "";
                for (let i in availableLanguages) {
                    let langName = require(`../lang/${availableLanguages[i]}.json`).lang_name;
                    LangList += `${availableLanguages[i]} ${langName}\n`;
                }
                message.channel.send(language.command.lang.error_not_found + '```' + LangList + '```' ).catch(error);
            }
        } else {
            message.channel.send(lang.command.lang.error_no_admin).catch(error);
        }
    }
}
module.exports = command;