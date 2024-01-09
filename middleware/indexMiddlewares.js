const {formatTimeRangedIndexRequestPayload} = require("../utils/IndexUtils/indexRequestFormatters");
const {getIndexValue} = require("../controllers/indexControllers");

module.exports = {
    /**
     * Initial handler middleware in chain of responsibility patter implementation. In charge of overhead previous execution.
     * @param codes {{worth: string, annualYield: string, maturityAverage: string, numberOfEmissions: string}} BCCR unique indicator codes.
     * @returns {(function(*, *, *): Promise<void>)|*}
     */
    indexMainMiddleware:  (codes) => {
        return async (req, res, next) => {
            try{
                // Writes into local environment variable the formatted payload to request.
                res.locals.payload = await formatTimeRangedIndexRequestPayload(req, codes)

                // If none of the GET parameters are requested, turn all on and returns a complete index response.
                if(!(Boolean(req.query.worth) || Boolean(req.query.annualYield) || Boolean(req.query.maturityAverage) || Boolean(req.query.numberOfEmissions))){
                    req.query.worth = true;
                    req.query.annualYield = true;
                    req.query.maturityAverage = true;
                    req.query.numberOfEmissions = true;
                }

                // Pass to index worth middleware.
                next()
            }catch(e){
                res.status(500).json({message: e.message})
            }
        }
    },
    /**
     * Handler middleware in chain of responsibility patter implementation. Fetches index worth if required.
     * @returns {(function(*, *, *): Promise<void>)|*}
     */
    indexWorthMiddleware: async (req, res, next) => {
        try{
            if(Boolean(req.query.worth)){

                // Build payload for index worth request
                const indexWorthPayload = {
                    code: res.locals.payload.codes.worth,
                    startDate: res.locals.payload.startDate,
                    endDate: res.locals.payload.endDate
                }

                // Updates local environment variable holding response.
                res.locals.response = {
                    ...res.locals.response,
                    worth: await getIndexValue(indexWorthPayload)
                }
            }

            // Pass to index annual yield middleware.
            next()
        }catch(e){
            res.status(500).json({message: e.message})
        }
    },


    /**
     * Handler middleware in chain of responsibility patter implementation. Fetches index annual yield if required.
     * @returns {(function(*, *, *): Promise<void>)|*}
     */
    indexAnnualYieldMiddleware: async (req, res, next) => {
        try{
            if(Boolean(req.query.annualYield)){

                // Build payload for index annual yield request
                const annualYieldPayload = {
                    code: res.locals.payload.codes.annualYield,
                    startDate: res.locals.payload.startDate,
                    endDate: res.locals.payload.endDate
                }

                // Updates local environment variable holding response.
                res.locals.response = {
                    ...res.locals.response,
                    annualYield: await getIndexValue(annualYieldPayload)
                }
            }

            // Pass to index average maturity middleware.
            next()
        }catch(e){
            res.status(500).json({message: e.message})
        }

    },

    /**
     * Handler middleware in chain of responsibility patter implementation. Fetches index maturity average if required.
     * @returns {(function(*, *, *): Promise<void>)|*}
     */
    indexMaturityAverageMiddleware: async (req, res, next) => {
        try{
            if(Boolean(req.query.maturityAverage)){

                // Build payload for index maturity average request
                const maturityAveragePayload = {
                    code: res.locals.payload.codes.maturityAverage,
                    startDate: res.locals.payload.startDate,
                    endDate: res.locals.payload.endDate
                }

                // Updates local environment variable holding response.
                res.locals.response = {
                    ...res.locals.response,
                    maturityAverage: await getIndexValue(maturityAveragePayload)
                }
            }

            // Pass to index number of emissions middleware.
            next()
        }catch(e){
            res.status(500).json({message: e.message})
        }
    },

    /**
     * Handler middleware in chain of responsibility patter implementation. Fetches index number of emissions if required.
     * @returns {(function(*, *, *): Promise<void>)|*}
     */
    indexNumberOfEmissionsMiddleware: async (req, res, next) => {
        try{
            if(Boolean(req.query.numberOfEmissions)){

                // Build payload for index number of emissions request
                const numberOfEmissionsPayload = {
                    code: res.locals.payload.codes.numberOfEmissions,
                    startDate: res.locals.payload.startDate,
                    endDate: res.locals.payload.endDate
                }

                // Updates local environment variable holding response.
                res.locals.response = {
                    ...res.locals.response,
                    numberOfEmissions: await getIndexValue(numberOfEmissionsPayload)
                }
            }

            // Pass to index response (last handler) middleware.
            next()
        }catch(e){
            res.status(500).json({message: e.message})
        }
    },

    /**
     * Last handler middleware in chain of responsibility patter implementation. Send response if execution succeed.
     */
    indexResponseMiddleware: (req, res) => {

        // Resolves request with data stored on local environment variable (filled by handlers).
        res.status(200).json(res.locals.response)
    }
}