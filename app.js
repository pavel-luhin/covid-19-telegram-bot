const TelegramBot = require('node-telegram-bot-api');

const countryModule = require('./modules/country');
const constants = require('./modules/commons/constants');

const bot = new TelegramBot(constants.telegramToken, {polling: true});

bot.onText(/.*/, (msg, match) => {
    const chatId = msg.chat.id;
    const country = match.input;
    console.log(country);

    processRequest(country)
        .then(response => {
            console.log(response);
            bot.sendMessage(chatId, response);
        });
});

const processRequest = (command) => {
    const firstArg = command.split("_")[0];
    const module = dictionary[firstArg];
    if (module) {
        return module.process(command)
    } else {
        return countryModule.process(command)
    }
};

const dictionary = {
    top: require('./modules/top'),
    '/help': require('./modules/help')
};