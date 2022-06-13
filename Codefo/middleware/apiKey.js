const ErrorHaldler = require("../errors/ErrorHaldler");

function apiKey(req, res, next) {
    const api_key = "1234567";
    console.log(req.query.api_key);
    const userAPiKey = req.query.api_key;
    if (userAPiKey && (userAPiKey === api_key)) {
        next()
    } else {
        return next(ErrorHaldler.ForbiddenError());

    }
    next()
}
module.exports = apiKey