

const HOST = 'https://gee.bccr.fi.cr';

module.exports = {
    requestIndicator: ({code, startDate, endDate}) => {
        return new Promise( async (resolve, reject) => {
            const params = `/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos?Indicador=${code}&FechaInicio=${startDate}&FechaFinal=${endDate}&Nombre=${process.env.BCCR_API_NAME}&SubNiveles=N&CorreoElectronico=${process.env.BCCR_API_EMAIL}&Token=${process.env.BCCR_API_TOKEN}`
            try{
                resolve(await fetch(HOST + params));
            }catch (e){
                reject(e)
            }
        })
    },
}