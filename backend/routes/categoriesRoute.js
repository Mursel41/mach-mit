const express = require('express');
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoriesController');

const validator = require('../middleware/validator');
const categoryRules = require('../utilities/validation/category');
const authorizeToken = require('../middleware/tokenAuth');
const authorizeAdmin = require('../middleware/adminAuth');

router
  .route('/')
  .get(getCategories)
  .post(
    authorizeToken,
    authorizeAdmin,
    validator(categoryRules),
    createCategory
  );

router
  .route('/:id')
  .put(authorizeToken, authorizeAdmin, validator(categoryRules), updateCategory)
  .delete(authorizeToken, authorizeAdmin, deleteCategory);

module.exports = router;
