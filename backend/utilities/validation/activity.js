const { body } = require('express-validator');

module.exports = [
  body('title')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 5, max: 30 })
    .withMessage('Title must be between 5 and 30 characters'),
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
  body('city').optional().trim().escape(),
  body('street').optional().trim().escape(),
  body('zip').optional().trim().escape(),
  body('paid').optional().trim().escape(),
  body('price')
    .optional()
    .trim()
    .escape(),
  body('image')
    .optional()
    .trim()
];
