module.exports = {
    formatCurrentValueIndicatorRequestPayload : (reqCode) => {

        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
        const today = new Date()

        return ({
            code: reqCode,
            startDate: today.toLocaleDateString('es-ES'),
            endDate: tomorrow.toLocaleDateString('es-ES')
        })
    }
}