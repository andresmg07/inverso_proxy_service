const {getLastDayOfMonth} = require("../BCCRUtil");
/**
 * Utilitarian function that formats request payload to retrieve the current value from an index.
 * @param reqCodes {{worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string}} BCCR unique indicator codes.
 * @returns {Promise<{
 *      codes: {worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string},
 *      endDate: Date,
 *      startDate: Date
 * }>}
 */
const formatRequestPayloadForLatestDate  = async (reqCodes) => {
    // Use of utilitarian function used to found the last day of the past month.
    const lastDayOfPastMonth = getLastDayOfMonth(new Date().getFullYear(), new Date().getMonth() - 1);
    return ({
        codes: reqCodes,
        startDate: lastDayOfPastMonth,
        endDate: lastDayOfPastMonth,
    })
}

/**
 * Utilitarian function that formats request payload to retrieve a value from an index on a specific month of a given year.
 * @param reqCodes {{worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string}} BCCR unique indicator codes.
 * @param reqTargetYear {string} Year index to be fetched.
 * @param reqTargetMonth {string} Month index to be fetched.
 * @returns {{
 *      codes: {worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string},
 *      endDate: Date,
 *      startDate: Date
 * }}
 */
const formatRequestPayloadForSingleDate = (reqCodes, reqTargetYear, reqTargetMonth) => {
    const lastDayOfGivenYearAndMonth = getLastDayOfMonth(parseInt(reqTargetYear), parseInt(reqTargetMonth));
    return ({
        codes: reqCodes,
        startDate: lastDayOfGivenYearAndMonth,
        endDate: lastDayOfGivenYearAndMonth
    })
}

/**
 * Utilitarian function that formats request payload to retrieve values from an index on a time range.
 * @param reqCodes {{worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string}} BCCR unique indicator codes.
 * @param reqStartYear {string} Range start year index to be fetched.
 * @param reqStartMonth {string} Range start month index to be fetched.
 * @param reqEndYear {string} Range end year index to be fetched.
 * @param reqEndMonth {string} Range end month index to be fetched.
 * @returns {{
 *      codes: {worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string},
 *      endDate: Date,
 *      startDate: Date
 * }}
 */
const formatRequestPayloadForDateRange = (reqCodes, reqStartYear, reqStartMonth, reqEndYear, reqEndMonth) => {
    const lastDayOfStartYearAndMonth = getLastDayOfMonth(parseInt(reqStartYear), parseInt(reqStartMonth));
    const lastDayOfEndYearAndMonth = getLastDayOfMonth(parseInt(reqEndYear), parseInt(reqEndMonth));
    return ({
        codes: reqCodes,
        startDate: lastDayOfStartYearAndMonth,
        endDate: lastDayOfEndYearAndMonth
    })
}

module.exports = {
    /**
     * Utilitarian function that acts as flow control structure depending on time range parameter for an index request.
     * @param req {Request} Object holding resource request metadata.
     * @param reqCodes {{worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string}} BCCR unique indicator codes.
     * @returns {
     *      {
     *          codes: {worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string},
     *          endDate: Date,
     *          startDate: Date
     *      }
     *      |
     *      Promise<{
 *              codes: {worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string},
     *          endDate: Date,
     *          startDate: Date
     *      }>
     * }
     */
    formatTimeRangedIndexRequestPayload : (req, reqCodes) => {
        switch (req.params.timeRange) {
            case 'current':
                return formatRequestPayloadForLatestDate(reqCodes)
            case 'single':
                const targetYear = req.query.year
                const targetMonth = req.query.month
                return formatRequestPayloadForSingleDate(reqCodes, targetYear, targetMonth)
            case 'range':
                const startYear = req.query.startYear
                const startMonth = req.query.startMonth
                const endYear = req.query.endYear
                const endMonth = req.query.endMonth
                return formatRequestPayloadForDateRange(reqCodes, startYear, startMonth, endYear, endMonth)
        }
    },

    /**
     * Utilitarian function that formats a request payload to retrieve a value from an index on a specific month and a given year with its corresponding reference.
     * @param req {Request} Object holding resource request metadata.
     * @param reqCodes {{worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string}} BCCR unique indicator codes.
     * @returns {{
     *      offsetDatePayload: {
     *          codes: {worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string},
     *          endDate: Date,
     *          startDate: Date
     *      },
     *      targetDatePayload: {
     *          codes: {worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string},
     *          endDate: Date,
     *          startDate: Date
     *      }
     * }}
     */
    formatReferencedIndexRequestPayload : (req, reqCodes) => {
        // Number of offset months from target date.
        const offset = parseInt(req.query.offset)

        const targetYear = parseInt(req.query.year)
        const targetMonth = parseInt(req.query.month)

        // Definition of offset date object previous to calculate last day of resulting month.
        const offsetDate = new Date(targetYear,targetMonth, 1)
        offsetDate.setMonth(offsetDate.getMonth() - offset)

        // Calculus of last day of given months for target and offset dates.
        const lastDayOfTargetYearAndMonth = getLastDayOfMonth(targetYear, targetMonth);
        const lastDayOfOffsetYearAndMonth = getLastDayOfMonth(offsetDate.getFullYear(), offsetDate.getMonth());

        return ({
            targetDatePayload: { codes: reqCodes, startDate: lastDayOfTargetYearAndMonth, endDate: lastDayOfTargetYearAndMonth },
            offsetDatePayload: { codes: reqCodes, startDate: lastDayOfOffsetYearAndMonth, endDate: lastDayOfOffsetYearAndMonth }
        })
    }
}