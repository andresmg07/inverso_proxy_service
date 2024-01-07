const {getLatestDateAvailableForRequest} = require("./BCCRRequestUtil");

const formatRequestPayloadForLatestDate  = async (reqCode) => {
    const latestDate = await getLatestDateAvailableForRequest({reqCode, targetDate: new Date()})
    return ({
        code: reqCode,
        startDate: latestDate,
        endDate: latestDate,
    })
}

const formatRequestPayloadForSingleDate = (reqCode, reqTargetDate) => {
    const targetDate = new Date(reqTargetDate)
    return ({
        code: reqCode,
        startDate: targetDate,
        endDate: targetDate
    })
}

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
    formatRequestPayload : (req, reqCode) => {
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

    formatReferencedRequestPayload : (req, reqCode) => {
        const offset = req.query.offset
        const targetDate = new Date(req.query.date)
        const offsetDate = new Date(req.query.date)
        offsetDate.setDate(offsetDate.getDate() - offset)
        return ({
            targetDatePayload: { code: reqCode, startDate: targetDate, endDate: targetDate },
            offsetDatePayload: { code: reqCode, startDate: offsetDate, endDate: offsetDate }
        })
    }
}