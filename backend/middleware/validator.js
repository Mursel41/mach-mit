const { validationResult } = require('express-validator');
const createError = require('http-errors');

module.exports = (validationRules) => [
  ...validationRules,
  function (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        throw new createError(400, 'Validation failed', {
          validator: errors
            .array()
            .map((error) => ({ field: error.param, message: error.msg })),
        });
      next();
    } catch (err) {
      next(err);
    }
  },
];
