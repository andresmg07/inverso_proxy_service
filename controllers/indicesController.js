const {formatIndexResponse} = require("../utils/IndexUtils/indexReponseFormatter");
const {requestBCCRWebService} = require("../requests/BCCRRequests");
const {formatTimeRangedIndexRequestPayload, formatReferencedIndexRequestPayload} = require("../utils/IndexUtils/IndexRequestFormatter");

module.exports = {
    getIndexValue: (code) => {
        return async (req, res) => {
            // Request payload formatted according to data inside req parameter.
            const payload = await formatTimeRangedIndexRequestPayload(req, code)
            console.log(payload)
            // BCCR web service request.
            requestBCCRWebService(payload)
                .then(indexRes => formatIndexResponse(indexRes))
                .then(formattedIndexRes => res.status(200).json(formattedIndexRes))
                .catch(e => res.status(500).json({message: e.message}))
        };
    },

    getIndexValueWithReference : (code) => {
        return (req, res) => {
            const payload = formatReferencedIndexRequestPayload(req, code)
            console.log(payload)
        };
    },
}