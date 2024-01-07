const {getSingleValueByTagName, getValuesByTagName, responseLength} = require("./BCCRRequestUtil");

/**
 * Utilitarian function that formats a single indicator data point response.
 * @param dataPoint {string} XML structured text containing target data point.
 * @returns {{date: string, value: number}}
 */
const formatIndicatorDataPoint = (dataPoint) => {
    return ({
        date: getSingleValueByTagName(dataPoint, 'DES_FECHA'),
        value: parseFloat(getSingleValueByTagName(dataPoint, 'NUM_VALOR')),
    })
}

/**
 * Utilitarian function that formats an indicator data set response.
 * @param dataSet {string} XML structured text containing target data set.
 * @returns {Array<{date: string, value: number}>}
 */
const formatIndicatorDataSet = (dataSet) => {

    // Definition of temporal result data structure.
    let formattedDataSet = []

    // Retrieval target of values
    const dates = getValuesByTagName(dataSet, 'DES_FECHA')
    const values = getValuesByTagName(dataSet, 'NUM_VALOR')

    // Collapse of retrieved target values into list of objects.
    for(let i = 0; i < responseLength(dataSet); i++){
        formattedDataSet.push({
            date: dates[i],
            value: parseFloat(values[i]),
        })
    }

    return formattedDataSet
}

module.exports = {
    /**
     * Utilitarian function for indicator response formatting. This function handle single and multiple value responses.
     * @param res {Response} BCCR web service response.
     * @returns {Promise<{date: string, value: number} | Array<{date: string, value: number}>>}
     */
    formatIndicatorResponse : (res) => {
        return new Promise((resolve, reject) => {
            res.text().then( txt => {
                if(responseLength(txt) === 1){
                    resolve(formatIndicatorDataPoint(txt))
                }else{
                    resolve(formatIndicatorDataSet(txt))
                }
            })
            .catch(() => {
                reject(new Error('Error while formatting response.'))
            })
        })
    },

    /**
     * Utilitarian function for indicator with reference formatting.
     * @param targetRes {{date: string, value: number}} Previously formatted BCCR web service response for target date.
     * @param offsetRes {{date: string, value: number}} Previously formatted BCCR web service response for reference date.
     * @returns {{offset, delta: number, target}}
     */
    formatIndicatorResponseWithReference: (targetRes, offsetRes) => {
        return {
            target: targetRes,
            offset: offsetRes,
            delta: (targetRes.value-offsetRes.value)/targetRes.value,
        }
    },
}