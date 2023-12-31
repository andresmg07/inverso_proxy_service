const {isIndicatorValuePresent} = require("./BCCRRequestUtil");
const formatRequestPayloadForLatestDate  = (reqCode) => {
    const latestDate = new Date()
    latestDate.setDate(latestDate.getDate() + 1)
    let payload = {
        code: reqCode,
        startDate: latestDate.toLocaleDateString('es-ES'),
        endDate: latestDate.toLocaleDateString('es-ES')
    }
    let hasBeenFound = async () => {
        return await isIndicatorValuePresent(payload);
    }
    console.log(hasBeenFound)
    latestDate.setDate(latestDate.getDate() - 1)
    payload = {
        code: reqCode,
        startDate: latestDate.toLocaleDateString('es-ES'),
        endDate: latestDate.toLocaleDateString('es-ES')
    }
    hasBeenFound = async () => {
        return await isIndicatorValuePresent(payload);
    }
    console.log(hasBeenFound)
    // while(!hasBeenFound){
    //     latestDate.setDate(latestDate.getDate() - 1)
    //     payload = {
    //         code: reqCode,
    //         startDate: latestDate.toLocaleDateString('es-ES'),
    //         endDate: latestDate.toLocaleDateString('es-ES')
    //     }
    //     isIndicatorValuePresent(payload).then(res => {hasBeenFound = res})
    // }
    console.log(payload)
    return payload
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
}