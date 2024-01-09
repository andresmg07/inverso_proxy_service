const {getLatestAvailableDateForRequest} = require("../BCCRUtil");

/**
 * Utilitarian function that formats request payload to retrieve the current value from an indicator.
 * @param reqCode {string} BCCR unique indicator code.
 * @returns {Promise<{code: string, endDate: Date, startDate: Date}>}
 */
const formatRequestPayloadForLatestDate  = async (reqCode) => {
    // Use of utilitarian function to found the latest available date for request a specific indicator. This call uses as initial target today's date.
    const latestDate = await getLatestAvailableDateForRequest(reqCode, new Date())
    return ({
        code: reqCode,
        startDate: latestDate,
        endDate: latestDate,
    })
}

/**
 * Utilitarian function that formats request payload to retrieve a value from an indicator on a specific date.
 * @param reqCode {string} BCCR unique indicator code.
 * @param reqTargetDate {string} Target date to be fetched.
 * @returns {{code, endDate: Date, startDate: Date}}
 */
const formatRequestPayloadForSingleDate = (reqCode, reqTargetDate) => {
    const targetDate = new Date(reqTargetDate)
    return ({
        code: reqCode,
        startDate: targetDate,
        endDate: targetDate
    })
}

/**
 * Utilitarian function that formats request payload to retrieve values from an indicator on a time range.
 * @param reqCode {string} BCCR unique indicator code.
 * @param reqStartDate {string} Start date for request range.
 * @param reqEndDate {string} End date for request range.
 * @returns {{code, endDate: Date, startDate: Date}}
 */
const formatRequestPayloadForDateRange = (reqCode, reqStartDate, reqEndDate) => {
    const startDate = new Date(reqStartDate)
    const endDate = new Date(reqEndDate)
    return ({
        code: reqCode,
        startDate,
        endDate
    })
}

module.exports = {
    /**
     * Utilitarian function that acts as flow control structure depending on time range parameter for an indicator request.
     * @param req {Request} Object holding resource request metadata.
     * @param reqCode {string} BCCR unique indicator code.
     * @returns {{code: string, endDate: Date, startDate: Date}|Promise<{code:string, endDate: Date, startDate: Date}>}
     */
    formatTimeRangedIndicatorRequestPayload : (req, reqCode) => {
        switch (req.params.timeRange) {
            case 'current':
                return formatRequestPayloadForLatestDate(reqCode)
            case 'single':
                const targetDate = req.query.date
                return formatRequestPayloadForSingleDate(reqCode, targetDate)
            case 'range':
                const startDate = req.query.startDate
                const endDate = req.query.endDate
                return formatRequestPayloadForDateRange(reqCode, startDate, endDate)
        }
    },

    /**
     * Utilitarian function that formats request payload to retrieve a value from an indicator on a specific date and a corresponding reference.
     * @param req {Request} Object holding resource request metadata.
     * @param reqCode {string} BCCR unique indicator code.
     * @returns {{offsetDatePayload: {code:string, endDate: Date, startDate: Date}, targetDatePayload: {code:string, endDate: Date, startDate: Date}}}
     */
    formatReferencedIndicatorRequestPayload : (req, reqCode) => {
        // Number of offset days from target date.
        const offset = parseInt(req.query.offset)

        // Initialization of objects on target date.
        const targetDate = new Date(req.query.date)
        const offsetDate = new Date(req.query.date)

        // Offset applied on corresponding date object.
        offsetDate.setDate(offsetDate.getDate() - offset)

        return ({
            targetDatePayload: { code: reqCode, startDate: targetDate, endDate: targetDate },
            offsetDatePayload: { code: reqCode, startDate: offsetDate, endDate: offsetDate }
        })
    }
}