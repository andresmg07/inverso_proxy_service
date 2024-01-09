module.exports = {
    /**
     * Utilitarian function for indicator with reference formatting.
     * @param targetRes {{date: string, value: number}} Previously formatted BCCR web service response for target date.
     * @param offsetRes {{date: string, value: number}} Previously formatted BCCR web service response for reference date.
     * @returns {{offset, delta: number, target}}
     */
    formatIndicatorResponseWithReference: (targetRes, offsetRes) => {
        return {
            target: targetRes,
            offset: offsetRes,
            delta: (targetRes.value-offsetRes.value)/targetRes.value,
        }
    },
}