const  getValueByTagName = (element, tagName) => {
    return element.documentElement.getElementsByTagName(tagName)[0].firstChild.nodeValue
}

module.exports = {
    formatIndicatorResponse : (response) => {
        return({
            code: getValueByTagName(response, 'COD_INDICADORINTERNO'),
            date: getValueByTagName(response, 'DES_FECHA'),
            value: parseFloat(getValueByTagName(response, 'NUM_VALOR')),
        })
    }
}