const express = require('express');
const router = express.Router();

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require('../controllers/usersController');

const validator = require('../middleware/validator');
const userRules = require('../utilities/validation/user');
// const authorizeToken = require('../middleware/tokenAuth');
// const authorizeUser = require('../middleware/userAuth');
// const authorizeAdmin = require('../middleware/adminAuth');

router.route('/').get(getUsers);

router.route('/signup').post(validator(userRules), addUser);

router.route('/login').post(loginUser);

router
  .route('/:id')
  .get(getUser)
  .put(validator(userRules), updateUser)
  .delete(deleteUser);

module.exports = router;
