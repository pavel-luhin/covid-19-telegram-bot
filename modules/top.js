const _ = require('lodash');

const externalService = require('./commons/externalService');

const process = (command) => {
    const args = command.split("_");

    const number = args[1];
    const type = args[2];

    return externalService.getStatistics()
        .then(response => parseResponse(response.data.response, number, type))
};

const parseResponse = (response, number, type) => {
    let result = `TOP ${number} ${type.toUpperCase()} CASES`;
    const field = dictionary[type];

    _
        .orderBy(response, [(elem) => provide(elem, field)], ['desc'])
        .filter(elem => elem.country.toUpperCase() !== 'all'.toUpperCase())
        .filter(elem => _.get(elem, field))
        .slice(0, number)
        .map(elem => `${elem.country.toUpperCase()}: ${_.get(elem, field)}`)
        .forEach(elem => result += `\n${elem}`);
    return result;
};

const provide = (elem, field) => {
    const sortField = _.get(elem, field);

    if (_.isString(sortField)) {
        return parseInt(sortField.match(/\d+/)[0]);
    }
    return sortField
};

const dictionary = {
    deaths: 'deaths.total',
    total: 'cases.total',
    recovered: 'cases.recovered',
    new: 'cases.new'
};

module.exports = {process};