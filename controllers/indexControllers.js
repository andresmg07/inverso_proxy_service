const {formatIndexResponseWithReference} = require("../utils/IndexUtils/indexReponseFormatters");
const {requestBCCRWebService} = require("../requests/BCCRRequests");
const {getResponseData} = require("../utils/BCCRUtil");
const {formatReferencedIndexRequestPayload} = require("../utils/IndexUtils/indexRequestFormatters");

module.exports = {
    /**
     *  Controller function for index retrieval within parameterized time range.
     * @param payload {code: string, startDate: Date, endDate: Date} Request payload
     * @returns {Promise<{date: string, value: number} | Array<{date: string, value: number}>>}
     */
    getIndexValue: (payload) => {
        return new Promise((resolve, reject) => {
            requestBCCRWebService(payload)
                .then(indexRes => getResponseData(indexRes))
                .then(indexResData => resolve(indexResData))
                .catch(e => reject(e.message))
        })
    },

    /**
     * Controller function for index retrieval accompanied by reference value.
     * @param codes {{worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string}} BCCR unique indicator codes.
     * @returns {(function(*, *): void)|*}
     */
    getIndexValueWithReference : (codes) => {
        return (req, res) => {
            const payloads = formatReferencedIndexRequestPayload(req, codes)
            return new Promise((resolve, reject) => {
                // BCCR web service request for indicator value on target date.
                getIndexValue(payloads.targetDatePayload)
                    .then(targetIndexRes => getResponseData(targetIndexRes))
                    .then(targetIndexResData => {
                        // BCCR web service request for indicator value on reference date.
                        getIndexValue(payloads.offsetDatePayload)
                            .then(offsetIndexRes => getResponseData(offsetIndexRes))
                            .then(offsetIndexResData => {
                                // Target and reference values formatting.
                                resolve(formatIndexResponseWithReference(targetIndexResData, offsetIndexResData))
                            })
                            .catch(e => reject(e.message))
                    })
                    .catch(e => reject(e.message))
            })
        }




    },
}