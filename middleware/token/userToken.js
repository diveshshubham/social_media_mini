var jwt = require('jsonwebtoken');
var jwtsecret = "indiaisgreat"
var { userModel } = require('../../models/index')
/**
 * function used for validate token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

let token = ""
function isValidToken(req, res, next) {


    if (req.headers['authorization']) {
        token = req.headers['authorization'];

        // Remove Bearer from string
        token = token.replace(/^Bearer\s+/, "");


        if (token) {
            jwt.verify(token, jwtsecret, { ignoreExpiration: true }, function (err, payload) {

                //console.log(payload, "here")
                if (err) {
                    console.log(err)
                    res.status(403).send({ msg: "forbidden" });
                } else {
                    if (payload.id) {
                        var condition = {
                            _id: payload.id
                        };
                        userModel.findOne(condition, function (err, document) {
                            if (err) {
                                res.status(500).send({ msg: "internel server error" });
                            } else {
                                if (document) {
                                    req.user = document;
                                    next();
                                } else {
                                    res.status(403).send({ msg: "forbidden" });
                                }
                            }
                        })
                    } else {
                        res.status(403).send({ msg: "forbidden" });
                    }
                }
            });
        } else {
            res.status(403).send({ msg: "forbidden" }); res.forbidden();
        }
    }
}

module.exports = isValidToken;