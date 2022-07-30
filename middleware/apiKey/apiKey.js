let APIKEY = "123"

/**
 * used for validate api key
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function isValidApiKey(req, res, next) {
    //Check source from swagger or not
    let source = req.headers['source'];

    let apiKey = req.headers['apikey'];
    if (apiKey == APIKEY) {
        next();
    } else {
        res.status(403).send({msg:"forbidden"});
    }
}

module.exports = isValidApiKey;