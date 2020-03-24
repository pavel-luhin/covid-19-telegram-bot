const constants = require('./constants');

const axios = require('axios');

const getStatistics = () => {
    return axios.get(constants.statisticsUrl, {
            headers: {
                'content-type': 'application/octet-stream',
                'x-rapidapi-host': constants.xRapidApiHost,
                'x-rapidapi-key': constants.xRapidApiKey
            }
        }
    );
};

const getHistory = () => {
    return axios.get(constants.historyUrl, {
            headers: {
                'content-type': 'application/octet-stream',
                'x-rapidapi-host': constants.xRapidApiHost,
                'x-rapidapi-key': constants.xRapidApiKey
            }
        }
    );
};

module.exports = {getStatistics, getHistory};