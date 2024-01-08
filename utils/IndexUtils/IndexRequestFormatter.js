const {getLastDayOfMonth} = require("../BCCRUtil");
/**
 * Utilitarian function that formats request payload to retrieve the current value from an indicator.
 * @param reqCode {string} BCCR unique indicator code.
 * @returns {Promise<{code, endDate: Date, startDate: Date}>}
 */
const formatRequestPayloadForLatestDate  = async (reqCode) => {
    // Use of utilitarian function used to found the last day of the past month.
    const lastDayOfPastMonth = getLastDayOfMonth(new Date().getFullYear(), new Date().getMonth() - 1);
    return ({
        code: reqCode,
        startDate: lastDayOfPastMonth,
        endDate: lastDayOfPastMonth,
    })
}

/**
 * Utilitarian function that formats request payload to retrieve a value from an indicator on a specific date.
 * @param reqCode {string} BCCR unique indicator code.
 * @param reqTargetYear {string} Year index to be fetched.
 * @param reqTargetMonth {string} Month index to be fetched.
 * @returns {{code, endDate: Date, startDate: Date}}
 */
const formatRequestPayloadForSingleDate = (reqCode, reqTargetYear, reqTargetMonth) => {
    const lastDayOfGivenYearAndMonth = getLastDayOfMonth(parseInt(reqTargetYear), parseInt(reqTargetMonth));
    console.log(lastDayOfGivenYearAndMonth)
    return ({
        code: reqCode,
        startDate: lastDayOfGivenYearAndMonth,
        endDate: lastDayOfGivenYearAndMonth
    })
}

/**
 * Utilitarian function that formats request payload to retrieve values from an indicator on a time range.
 * @param reqCode {string} BCCR unique indicator code.
 * @param reqStartYear {string} Range start year index to be fetched.
 * @param reqStartMonth {string} Range start month index to be fetched.
 * @param reqEndYear {string} Range end year index to be fetched.
 * @param reqEndMonth {string} Range end month index to be fetched.
 * @returns {{code, endDate: Date, startDate: Date}}
 */
const formatRequestPayloadForDateRange = (reqCode, reqStartYear, reqStartMonth, reqEndYear, reqEndMonth) => {
    const lastDayOfStartYearAndMonth = getLastDayOfMonth(parseInt(reqStartYear), parseInt(reqStartMonth));
    const lastDayOfEndYearAndMonth = getLastDayOfMonth(parseInt(reqEndYear), parseInt(reqEndMonth));
    return ({
        code: reqCode,
        startDate: lastDayOfStartYearAndMonth,
        endDate: lastDayOfEndYearAndMonth
    })
}

module.exports = {
    /**
     * Utilitarian function that acts as flow control structure depending on time range parameter for an index request.
     * @param req {Request} Object holding resource request metadata.
     * @param reqCode {string} BCCR unique indicator code.
     * @returns {{code, endDate: Date, startDate: Date}|Promise<{code, endDate: Date, startDate: Date}>}
     */
    formatTimeRangedIndexRequestPayload : (req, reqCode) => {
        switch (req.params.timeRange) {
            case 'current':
                return formatRequestPayloadForLatestDate(reqCode)
            case 'single':
                const targetYear = req.query.year
                const targetMonth = req.query.month
                return formatRequestPayloadForSingleDate(reqCode, targetYear, targetMonth)
            case 'range':
                const startYear = req.query.startYear
                const startMonth = req.query.startMonth
                const endYear = req.query.endYear
                const endMonth = req.query.endMonth
                return formatRequestPayloadForDateRange(reqCode, startYear, startMonth, endYear, endMonth)
        }
    },

    /**
     * Utilitarian function that formats request payload to retrieve a value from an index on a specific date and a corresponding reference.
     * @param req {Request} Object holding resource request metadata.
     * @param reqCode {string} BCCR unique indicator code.
     * @returns {{offsetDatePayload: {code, endDate: Date, startDate: Date}, targetDatePayload: {code, endDate: Date, startDate: Date}}}
     */
    formatReferencedIndexRequestPayload : (req, reqCode) => {
        // Number of offset days from target date.
        const offset = parseInt(req.query.offset)

        const targetYear = parseInt(req.query.year)
        const targetMonth = parseInt(req.query.month)

        // Definition of offset date object previous to calculate last day of resulting month
        const offsetDate = new Date(targetYear,targetMonth, 1)
        offsetDate.setMonth(offsetDate.getMonth() - offset)

        // Initialization of objects on target date.
        const lastDayOfTargetYearAndMonth = getLastDayOfMonth(targetYear, targetMonth);
        const lastDayOfOffsetYearAndMonth = getLastDayOfMonth(offsetDate.getFullYear(), offsetDate.getMonth());

        return ({
            targetDatePayload: { code: reqCode, startDate: lastDayOfTargetYearAndMonth, endDate: lastDayOfTargetYearAndMonth },
            offsetDatePayload: { code: reqCode, startDate: lastDayOfOffsetYearAndMonth, endDate: lastDayOfOffsetYearAndMonth }
        })
    }
}