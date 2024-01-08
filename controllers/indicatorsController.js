const {requestBCCRWebService} = require("../requests/BCCRRequests");
const {formatIndicatorResponse, formatIndicatorResponseWithReference} = require("../utils/IndicatorUtils/indicatorReponseFormatter");
const {formatTimeRangedIndicatorRequestPayload, formatReferencedIndicatorRequestPayload} = require("../utils/IndicatorUtils/indicatorRequestFormatter");

module.exports = {
    /**
     * Controller function for indicator retrieval within parameterized time ranged.
     * @param code {string} BCCR unique indicator code (inside payload object).
     * @returns {(function(*, *): Promise<void>)|*}
     */
    getIndicatorValue: (code) => {
        return async (req, res) => {
            // Request payload formatted according to data inside req parameter.
            const payload = await formatTimeRangedIndicatorRequestPayload(req, code)
            // BCCR web service request.
            requestBCCRWebService(payload)
                .then(indicatorRes => formatIndicatorResponse(indicatorRes))
                .then(formattedIndicatorRes => res.status(200).json(formattedIndicatorRes))
                .catch(e => res.status(500).json({message: e.message}))
        };
    },

    /**
     * Controller function for indicator retrieval accompanied by reference value.
     * @param code {string} BCCR unique indicator code (inside payload object).
     * @returns {(function(*, *): void)|*}
     */
    getIndicatorValueWithReference: (code) => {
        return (req, res) => {
            // Multiple request payloads formatted according to data inside req parameter.
            const payloads = formatReferencedIndicatorRequestPayload(req, code)
            // BCCR web service request for indicator value on target date.
            requestBCCRWebService(payloads.targetDatePayload)
                .then(indicatorRes => formatIndicatorResponse(indicatorRes))
                .then(formattedTargetIndicatorRes => {
                    // BCCR web service request for indicator value on reference date.
                    requestBCCRWebService(payloads.offsetDatePayload)
                        .then(indicatorRes => formatIndicatorResponse(indicatorRes))
                        .then(formattedOffsetIndicatorRes => {
                            // Target and reference values formatting.
                            res.status(200).json(formatIndicatorResponseWithReference(formattedTargetIndicatorRes, formattedOffsetIndicatorRes))
                        })
                        .catch(e => res.status(500).json({message: e.message}))
                })
                .catch(e => res.status(500).json({message: e.message}))
        }
    }

}