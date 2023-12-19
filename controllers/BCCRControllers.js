const convert = require('xml-js');
const {requestIndicator} = require("../requests/BCCRRequests");

module.exports = {
    getTodayDollarColonSellExchangeRate:(req, res) => {

        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        const today = new Date()

        const payload = {
            code: '3149',
            startDate: today.toLocaleDateString('es-ES'),
            endDate: tomorrow.toLocaleDateString('es-ES')
        };
        requestIndicator(payload)
            .then(res => res.text())
            .then(str => convert.xml2json(str))
            .then(xmlFormatted => JSON.parse(xmlFormatted))
            .then(jsonFormatted => {
                return res.status(200).json(jsonFormatted)
            })
            .catch((error) => {
                return res.status(500).json({error});
        })
    },
}