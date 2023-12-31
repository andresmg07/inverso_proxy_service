const {DOMParser} = require("xmldom");
const  getValueByTagName = (element, tagName) => {
    return element.documentElement.getElementsByTagName(tagName)[0].firstChild.nodeValue
}

module.exports = {
    formatIndicatorResponse : (res) => {
        return new Promise((resolve, reject) => {
            res.text().then( txt => {
                const xmlResFormatted = new DOMParser().parseFromString(txt)
                resolve({
                    date: getValueByTagName(xmlResFormatted, 'DES_FECHA'),
                    value: parseFloat(getValueByTagName(xmlResFormatted, 'NUM_VALOR')),
                })
            })
            .catch(() => {
                reject(new Error('Error while formatting response.'))
            })
        })

    }
}