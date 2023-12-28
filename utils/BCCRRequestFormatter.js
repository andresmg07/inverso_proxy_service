const formatRequestPayloadForCurrentDate = (reqCode) => {
    const today = new Date().toLocaleDateString('es-ES')
    return ({
        code: reqCode,
        startDate: today,
        endDate: today
    })
}

const formatRequestPayloadForSingleDate = (reqCode, reqTargetDate) => {
    const targetDate = new Date(reqTargetDate).toLocaleDateString('es-ES')
    return ({
        code: reqCode,
        startDate: targetDate,
        endDate: targetDate
    })
}

const formatRequestPayloadForDateRange = (reqCode, reqStartDate, reqEndDate) => {
    const startDate = new Date(reqStartDate).toLocaleDateString('es-ES')
    const endDate = new Date(reqEndDate).toLocaleDateString('es-ES')
    return ({
        code: reqCode,
        startDate,
        endDate
    })
}


module.exports = {
    formatRequestPayload : (req, reqCode) => {
        switch (req.params.timeRange) {
            case 'today':
                return formatRequestPayloadForCurrentDate(reqCode)
            case 'single':
                const targetDate = req.query.date
                return formatRequestPayloadForSingleDate(reqCode, targetDate)
            case 'range':
                const startDate = req.query.startDate
                const endDate = req.query.endDate
                return formatRequestPayloadForDateRange(reqCode, startDate, endDate)
        }
    },
}