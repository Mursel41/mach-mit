const { body } = require('express-validator');

module.exports = [
  body('title')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 5, max: 20 })
    .withMessage('Title must be between 5 and 20 characters'),
  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 10, max: 256 })
    .withMessage('Description must be between 10 and 256 characters'),
  body('typeOfActivity').optional().escape().trim(),
  body('typeOfAttendee').optional().trim().escape(),
  body('numberOfAttendee')
    .optional()
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Type of attendee must contain only numbers'),
  body('address.city').optional().trim().escape(),
  body('address.street').optional().trim().escape(),
  body('address.zip').optional().trim().escape(),
  body('price')
    .optional()
    .trim()
    .escape()
    .isNumeric()
    .withMessage('Price must contain only numbers'),
  body('image').optional().trim(),
];
