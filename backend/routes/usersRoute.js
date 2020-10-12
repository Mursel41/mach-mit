const express = require('express');
const router = express.Router();

const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: "assets/uploads/",
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  }),
  limits: {
    fileSize: 1024 * 1024
  }
});
 

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  userImage
} = require('../controllers/usersController');

const validator = require('../middleware/validator');
const userRules = require('../utilities/validation/user');
const authorizeToken = require('../middleware/tokenAuth');
const authorizeUser = require('../middleware/userAuth');
const authorizeAdmin = require('../middleware/adminAuth');


router
  .route('/:id/userImage')
  .post(upload.single("image"), userImage)

router.route('/').get(authorizeToken, authorizeAdmin, getUsers);

router.route('/signup').post(validator(userRules), addUser);

router.route('/login').post(loginUser);

router
  .route('/:id')
  // .get(authorizeToken, authorizeUser, getUser)
  .get(authorizeToken, getUser)
  .put(authorizeToken, authorizeUser, validator(userRules), updateUser)
  .delete(authorizeToken, authorizeUser, deleteUser);


module.exports = router;
