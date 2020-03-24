const moment = require('moment');

const externalService = require('./commons/externalService');

const findTotalByCountry = (country) => {
    return externalService.execute()
        .then(response => parseResponse(response, country))
};

const parseResponse = (response, country) => {
    let stats = findCountry(response, country);
    if (!stats) {
        country = 'TOTAL';
        stats = findCountry(response, 'all');
    }
    return `${country} CASES: ${stats.cases.total}
${country} DEATHS: ${stats.deaths.total}
${country} RECOVERED: ${stats.cases.recovered}
UPD: ${moment(String(stats.time)).format('MMMM Do YYYY, HH:mm')}`
};

const findCountry = (response, country) => {
    return response.find(elem => elem.country.toUpperCase() === country.toUpperCase());
};

module.exports = findTotalByCountry;