const createError = require('http-errors');

exports.error400 = (req, res, next) => {
  const error = new createError.BadRequest();
  next(error);
};

exports.handleErrors = (err, req, res, next) => {
  if (err.code === 11000) {
    err.message = 'Email is already registered';
  }
  res.status(err.status || 500).send({
    error: {
      message: err.message,
      details: err.validator || null,
    },
  });
};
