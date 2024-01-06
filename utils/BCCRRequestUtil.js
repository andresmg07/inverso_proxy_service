const {requestIndicator} = require("../requests/BCCRRequests");
const {DOMParser} = require("xmldom");

const getValueByTagName = (element, tagName) => {
    return element.documentElement.getElementsByTagName(tagName)[0].firstChild.nodeValue
}

const isValidResponse = (response) => {
    return new DOMParser().parseFromString(response).documentElement.getElementsByTagName('NUM_VALOR').length !== 0
}


const getLatestDateAvailableForRequest = ({reqCode, targetDate}) => {
    return new Promise(resolve => {
        requestIndicator({code: reqCode, startDate: targetDate, endDate: targetDate})
            .then(res => res.text())
            .then(txt => {
                if(isValidResponse(txt)){
                    resolve(targetDate)
                }else{
                    targetDate.setDate(targetDate.getDate() - 1)
                    resolve(getLatestDateAvailableForRequest({reqCode, targetDate}))
                }
            })
    })
}

module.exports = {
    getLatestDateAvailableForRequest,
    getValueByTagName,
}