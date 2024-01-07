const {requestBCCRWebService} = require("../requests/BCCRRequests");
const {formatIndicatorResponse, formatIndicatorResponseWithReference} = require("../utils/BCCRReponseFormatter");
const {formatRequestPayload, formatReferencedRequestPayload} = require("../utils/BCCRRequestFormatter");

module.exports = {
    getIndicatorValue: (code) => {
        return async (req, res) => {
            const payload = await formatRequestPayload(req, code)
            requestBCCRWebService(payload)
                .then(indicatorRes => formatIndicatorResponse(indicatorRes))
                .then(formattedIndicatorRes => res.status(200).json(formattedIndicatorRes))
                .catch(e => res.status(500).json({message: e.message}))
        };
    },

    getIndicatorValueWithReference: (code) => {
        return (req, res) => {
            const payloads = formatReferencedRequestPayload(req, code)
            requestBCCRWebService(payloads.targetDatePayload)
                .then(indicatorRes => formatIndicatorResponse(indicatorRes))
                .then(formattedTargetIndicatorRes => {
                    requestBCCRWebService(payloads.offsetDatePayload)
                        .then(indicatorRes => formatIndicatorResponse(indicatorRes))
                        .then(formattedOffsetIndicatorRes => {
                            res.status(200).json(formatIndicatorResponseWithReference(formattedTargetIndicatorRes, formattedOffsetIndicatorRes))
                        })
                        .catch(e => res.status(500).json({message: e.message}))
                })
                .catch(e => res.status(500).json({message: e.message}))
        }
    }

}