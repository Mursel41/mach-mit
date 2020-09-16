const createError = require('http-errors');
const User = require('../models/UserModel');

const authorizeToken = async (req, res, next) => {
  const token = req.header('X-Auth-Token');
  try {
    const user = await User.findByToken(token);
    if (!user) throw new createError.Unauthorized();
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizeToken;
