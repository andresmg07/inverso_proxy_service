const { DOMParser } = require('xmldom')
const {requestIndicator} = require("../requests/BCCRRequests");
const {formatIndicatorResponse} = require("../utils/BCCRReponseFormatter");
const {formatCurrentValueIndicatorRequestPayload} = require("../utils/BCCRRequestFormatter");

module.exports = {
    getIndicatorCurrentValue: (code) => {
        return (req, res) => {
            const payload = formatCurrentValueIndicatorRequestPayload(code)
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
    getIndicatorCurrentAndLastValue: (code) => {
        return (req, res) => {
            const payload = formatCurrentValueIndicatorRequestPayload(code)
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