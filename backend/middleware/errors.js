const createError = require('http-errors');

exports.throw400 = (req, res, next) => {
    const error = new createError.BadRequest();
    next(error);
};

exports.handleErrors = (err, req, res, next) => {
    res.status(err.status || 500).send({
        error: {
            message: err.message,
            details: err.validator || null
        }
    });
};