const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const moment = require('moment');

const apiToken = process.env.TG_TOKEN;

const bot = new TelegramBot(apiToken, {polling: true});
const url = 'https://covid-193.p.rapidapi.com/statistics';
const xRapidApiKey = process.env.X_RAPIDAPI_KEY;
const xRapidApiHost = 'covid-193.p.rapidapi.com';

bot.onText(/.*/, (msg, match) => {
    const chatId = msg.chat.id;

    axios.get(url, {
            headers: {
                'content-type': 'application/octet-stream',
                'x-rapidapi-host': xRapidApiHost,
                'x-rapidapi-key': xRapidApiKey
            }
        }
    )
        .then(response => {
            const result = parseResponse(response.data.response, match.input);
            bot.sendMessage(chatId, result);
        })
});

const parseResponse = (response, country) => {
    let stats = findCountry(response, country);
    if (!stats) {
        country = 'TOTAL';
        stats = findCountry(response,'all');
    }
    return `${country} CASES: ${stats.cases.total}
${country} DEATHS: ${stats.deaths.total}
${country}r RECOVERED: ${stats.cases.recovered}
UPD: ${moment(String(stats.time)).format('MMMM Do YYYY, HH:mm')}`
};

const findCountry = (response, country) => {
    return response.find(elem => elem.country.toUpperCase() === country.toUpperCase());
};