const {getSingleValueByTagName, getValuesByTagName, responseLength} = require("./BCCRRequestUtil");

const formatIndicatorDataPoint = (dataPoint) => {
    return ({
        date: getSingleValueByTagName(dataPoint, 'DES_FECHA'),
        value: parseFloat(getSingleValueByTagName(dataPoint, 'NUM_VALOR')),
    })
}

const formatIndicatorDataSet = (dataSet) => {
    let formattedDataSet = []
    const dates = getValuesByTagName(dataSet, 'DES_FECHA')
    const values = getValuesByTagName(dataSet, 'NUM_VALOR')

    console.log(dates)

    for(let i = 0; i < responseLength(dataSet); i++){
        formattedDataSet.push({
            date: dates[i].firstChild.nodeValue,
            value: parseFloat(values[i].firstChild.nodeValue),
        })
    }
    return formattedDataSet
}

module.exports = {
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
    formatIndicatorResponseWithReference: (targetRes, offsetRes) => {
        return {
            target: targetRes,
            offset: offsetRes,
            delta: (targetRes.value-offsetRes.value)/targetRes.value,
        }
    },
}