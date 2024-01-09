const {requestBCCRWebService} = require("../requests/BCCRRequests");
const {formatIndicatorResponseWithReference} = require("../utils/IndicatorUtils/indicatorReponseFormatters");
const {formatTimeRangedIndicatorRequestPayload, formatReferencedIndicatorRequestPayload} = require("../utils/IndicatorUtils/indicatorRequestFormatters");
const {getResponseData} = require("../utils/BCCRUtil");

module.exports = {
    /**
     * Controller function for indicator retrieval within parameterized time range.
     * @param code {string} BCCR unique indicator code.
     * @returns {(function(*, *): Promise<void>)|*}
     */
    getIndicatorValue: (code) => {
        return async (req, res) => {
            // Request payload formatted according to data inside req parameter.
            const payload = await formatTimeRangedIndicatorRequestPayload(req, code)
            // BCCR web service request.
            requestBCCRWebService(payload)
                .then(indicatorRes => getResponseData(indicatorRes))
                .then(indicatorResData => res.status(200).json(indicatorResData))
                .catch(e => res.status(500).json({message: e.message}))
        };
    },

    /**
     * Controller function for indicator retrieval accompanied by reference value.
     * @param code {string} BCCR unique indicator code.
     * @returns {(function(*, *): void)|*}
     */
    getIndicatorValueWithReference: (code) => {
        return (req, res) => {
            // Multiple request payloads formatted according to data inside req parameter.
            const payloads = formatReferencedIndicatorRequestPayload(req, code)
            // BCCR web service request for indicator value on target date.
            requestBCCRWebService(payloads.targetDatePayload)
                .then(indicatorRes => getResponseData(indicatorRes))
                .then(targetIndicatorResData => {
                    // BCCR web service request for indicator value on reference date.
                    requestBCCRWebService(payloads.offsetDatePayload)
                        .then(indicatorRes => getResponseData(indicatorRes))
                        .then(offsetIndicatorResData => {
                            // Target and reference values formatting.
                            res.status(200).json(formatIndicatorResponseWithReference(targetIndicatorResData, offsetIndicatorResData))
                        })
                        .catch(e => res.status(500).json({message: e.message}))
                })
                .catch(e => res.status(500).json({message: e.message}))
        }
    }

}