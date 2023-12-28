const { DOMParser } = require('xmldom')
const {requestIndicator} = require("../requests/BCCRRequests");
const {formatIndicatorResponse} = require("../utils/BCCRReponseFormatter");
const {formatRequestPayload} = require("../utils/BCCRRequestFormatter");

module.exports = {
    getIndicatorValue: (code) => {
        return (req, res) => {
            const payload = formatRequestPayload(req, code)
            requestIndicator(payload)
                .then(res => res.text())
                .then(str => {
                    const xmlFormatted = new DOMParser().parseFromString(str)
                    res.status(200).json(formatIndicatorResponse(xmlFormatted));
                })
                .catch((error) => {
                    res.status(500).json({error});
                })
        };
    },
    getIndicatorValueWithReference: (code) => {
        return (req, res) => {
            const payload = formatRequestPayloadForCurrentDate(code)
            requestIndicator(payload)
                .then(res => res.text())
                .then(str => {
                    const xmlFormatted = new DOMParser().parseFromString(str)
                    res.status(200).json(formatIndicatorResponse(xmlFormatted));
                })
                .catch((error) => {
                    res.status(500).json({error});
                })
        };
    },
}