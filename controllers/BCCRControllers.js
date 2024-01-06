const { DOMParser } = require('xmldom')
const {requestIndicator} = require("../requests/BCCRRequests");
const {formatIndicatorResponse} = require("../utils/BCCRReponseFormatter");
const {formatRequestPayload} = require("../utils/BCCRRequestFormatter");

module.exports = {
    getIndicatorValue: (code) => {
        return async (req, res) => {
            const payload = await formatRequestPayload(req, code)
            requestIndicator(payload)
                .then(indicatorRes => formatIndicatorResponse(indicatorRes))
                .then(formattedIndicatorRes => res.status(200).json(formattedIndicatorRes))
                .catch(e => res.status(500).json({message: e.message}))
        };
    },
    getIndicatorValueWithReference: (code) => {
    },
}