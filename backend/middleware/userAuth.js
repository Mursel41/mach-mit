const createError = require('http-errors');

const authorizeUser = async (req, res, next) => {
  try {
    if (
      String(req.user._id) !== String(req.params.id) &&
      req.user.role !== 'admin'
    )
      throw new createError.Unauthorized();
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizeUser;
