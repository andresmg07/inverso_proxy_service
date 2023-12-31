const {requestIndicator} = require("../requests/BCCRRequests");
const {DOMParser} = require("xmldom");
const {formatIndicatorResponse} = require("./BCCRReponseFormatter");

module.exports = {
    isIndicatorValuePresent: (payload) => {
        return new Promise(resolve => {
            requestIndicator(payload)
                .then(res => res.text())
                .then(txt => {
                    resolve(new DOMParser().parseFromString(txt).documentElement.getElementsByTagName('NUM_VALOR').length !== 0)
                })
        })


    },
}