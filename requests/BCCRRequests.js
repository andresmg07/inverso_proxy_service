// BCCR web service domain.
const HOST = 'https://gee.bccr.fi.cr';

module.exports = {
    /**
     * Function that fetch from BCCR indicator web service.
     * @param code {string} BCCR unique indicator code (inside payload object).
     * @param startDate {Date} Start date for request range (inside payload object).
     * @param endDate {Date} End date for request range (inside payload object).
     * @returns {Promise<Response>}
     */
    requestBCCRWebService: ({code, startDate, endDate}) => {
        return new Promise( async (resolve, reject) => {
            // Formatted into the request strings each date is converted into spanish locale date string.
            const params = `/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos?Indicador=${code}&FechaInicio=${startDate.toLocaleDateString('es-ES')}&FechaFinal=${endDate.toLocaleDateString('es-ES')}&Nombre=${process.env.BCCR_API_NAME}&SubNiveles=N&CorreoElectronico=${process.env.BCCR_API_EMAIL}&Token=${process.env.BCCR_API_TOKEN}`
            try{
                resolve(await fetch(HOST + params));
            }catch (e){
                reject(e)
            }
        })
    },
}