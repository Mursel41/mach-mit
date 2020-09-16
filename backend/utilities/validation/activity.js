const { body } = require('express-validator');

module.exports = [
  body('title')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 10, max: 256 })
    .withMessage('Title must be between 10 and 256 characters'),
  body('description')
    .optional()
    .trim()
    .escape()
    .isLength({ min: 10, max: 256 })
    .withMessage('Description must be between 10 and 256 characters'),
  body('typeOfActivity')
    .optional()
    .escape()
    .trim()
    .isAlpha()
    .withMessage('Type of activity must contain only letters'),
  body('typeOfAttendee')
    .optional()
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Type of attendee must contain only letters'),
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
  body('image')
    .optional()
    .trim()
    .escape()
    .isAlpha()
    .withMessage('Image must contain only letters'),
];
