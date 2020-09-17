const { body } = require('express-validator');

module.exports = [
  body('name')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 2, max: 256 })
    .withMessage('Name must be between 2 and 256 characters'),
];
