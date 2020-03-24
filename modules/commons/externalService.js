const constants = require('./constants');

const axios = require('axios');

const execute = () => {
    return axios.get(constants.url, {
            headers: {
                'content-type': 'application/octet-stream',
                'x-rapidapi-host': constants.xRapidApiHost,
                'x-rapidapi-key': constants.xRapidApiKey
            }
        }
    );
};

module.exports = execute;