// BCCR web service domain.
const HOST = 'https://gee.bccr.fi.cr';

module.exports = {
    /**
     * Function that fetch from BCCR indicator web service.
     * @param payload {code: string, startDate: Date, endDate: Date} Request payload
     * @returns {Promise<Response>}
     */
    requestBCCRWebService: (payload) => {
        return new Promise( async (resolve, reject) => {
            // Formatted into the request strings each date is converted into spanish locale date string.
            const params = `/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos?Indicador=${payload.code}&FechaInicio=${payload.startDate.toLocaleDateString('es-ES')}&FechaFinal=${payload.endDate.toLocaleDateString('es-ES')}&Nombre=${process.env.BCCR_API_NAME}&SubNiveles=N&CorreoElectronico=${process.env.BCCR_API_EMAIL}&Token=${process.env.BCCR_API_TOKEN}`
            try{
                resolve(await fetch(HOST + params));
            }catch (e){
                reject(e)
            }
        })
    },
}