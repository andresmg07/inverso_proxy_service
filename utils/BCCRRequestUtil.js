const {requestIndicator} = require("../requests/BCCRRequests");
const {DOMParser} = require("xmldom");

const getSingleValueByTagName = (response, tagName) => {
    return new DOMParser().parseFromString(response).documentElement.getElementsByTagName(tagName)[0].firstChild.nodeValue
}

const getValuesByTagName = (response, tagName) => {
    return new DOMParser().parseFromString(response).documentElement.getElementsByTagName(tagName)
}

const responseLength = (response) => {
    return new DOMParser().parseFromString(response).documentElement.getElementsByTagName('NUM_VALOR').length
}


const getLatestDateAvailableForRequest = ({reqCode, targetDate}) => {
    return new Promise(resolve => {
        requestIndicator({code: reqCode, startDate: targetDate, endDate: targetDate})
            .then(res => res.text())
            .then(txt => {
                if(responseLength(txt) !== 0){
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
    getSingleValueByTagName,
    getValuesByTagName,
    responseLength,
}