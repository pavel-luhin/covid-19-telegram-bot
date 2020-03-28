const constants = require('./constants');

const axios = require('axios');

const getStatistics = () => execute(constants.statisticsUrl);
const getHistory = () => execute(constants.historyUrl);

const execute = (url) => axios.get(url, {
        headers: {
            'content-type': 'application/octet-stream',
            'x-rapidapi-host': constants.xRapidApiHost,
            'x-rapidapi-key': constants.xRapidApiKey
        }
    }
);

module.exports = {getStatistics, getHistory};