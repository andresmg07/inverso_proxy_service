const {requestBCCRWebService} = require("../requests/BCCRRequests");
const {DOMParser} = require("xmldom");

/**
 * Utilitarian function that fetches the first child node value on XML structured text that matches with a specific tag name.
 * @param response {string} XML structured text.
 * @param tagName {string} Target tag name to fetch.
 * @returns {string}
 */
const getSingleValueByTagName = (response, tagName) => {
    return new DOMParser().parseFromString(response).documentElement.getElementsByTagName(tagName)[0].firstChild.nodeValue
}

/**
 * Utilitarian function that fetches all node values on XML structured text that matches with a specific tag name.
 * @param response {string} XML structured text.
 * @param tagName {string} Target tag name to fetch.
 * @returns {Array<string>}
 */
const getValuesByTagName = (response, tagName) => {
    const nodes = Array.from(new DOMParser().parseFromString(response).documentElement.getElementsByTagName(tagName))
    return nodes.map(node => node.firstChild.nodeValue)
}

/**
 * Utilitarian function that counts the number of valid data points in XML structured text.
 * @param response {string} XML structured text.
 * @returns {number}
 */
const getResponseLength = (response) => {
    return new DOMParser().parseFromString(response).documentElement.getElementsByTagName('NUM_VALOR').length
}

/**
 * Utilitarian function that returns the last day of a given month and year.
 * @param year {number} Target year to calculate last day of given month.
 * @param month {number} Target moth to calculate last day.
 * @returns {Date}
 */
const getLastDayOfMonth = (year, month) => {
    return new Date(year, month + 1, 0);
}

/**
 * Recursive utilitarian function that founds the latest available date for request a specific indicator.
 * @param reqCode {string} BCCR unique indicator code.
 * @param targetDate {Date} Changing date parameter through recursion. This parameter is decreased util valid date is found.
 * @returns {Promise<Date>}
 */
const getLatestAvailableDateForRequest = (reqCode, targetDate) => {
    return new Promise(resolve => {
        // BCCR web service request.
        requestBCCRWebService({code: reqCode, startDate: targetDate, endDate: targetDate})
            .then(res => res.text())
            .then(txt => {
                if(getResponseLength(txt) !== 0){
                    resolve(targetDate)
                }else{
                    // Parameter date decrement.
                    targetDate.setDate(targetDate.getDate() - 1)
                    // Recursive call.
                    resolve(getLatestAvailableDateForRequest(reqCode, targetDate))
                }
            })
    })
}

module.exports = {
    getLatestAvailableDateForRequest,
    getSingleValueByTagName,
    getValuesByTagName,
    getResponseLength,
    getLastDayOfMonth,
}