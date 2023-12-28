const  getValueByTagName = (element, tagName) => {
    return element.documentElement.getElementsByTagName(tagName)[0].firstChild.nodeValue
}

module.exports = {
    formatIndicatorResponse : (res) => {
        return({
            date: getValueByTagName(res, 'DES_FECHA'),
            value: parseFloat(getValueByTagName(res, 'NUM_VALOR')),
        })
    }
}