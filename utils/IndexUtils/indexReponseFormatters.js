module.exports = {

    /**
     * Utilitarian function for index with reference formatting.
     * @param targetRes {{date: string, value: number}} Previously formatted BCCR web service response for target date.
     * @param offsetRes {{date: string, value: number}} Previously formatted BCCR web service response for reference date.
     * @returns {{offset, delta: number, target}}
     */
    formatIndexResponseWithReference: (targetRes, offsetRes) => {
        return {
            target: targetRes,
            offset: offsetRes,
            delta: (targetRes.value-offsetRes.value)/targetRes.value,
        }
    },
}