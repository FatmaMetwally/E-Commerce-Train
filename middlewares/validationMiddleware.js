
const {body, validationResult } = require("express-validator")
const nameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{2,})$/; //each word should have a minimum length of two characters.
const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

const validateRegistration = [
    
  body('name')
  .matches(nameRegex)
  .withMessage('Please enter a valid name with at least 2 words'),

body('email')
.isEmail()
.withMessage('Please enter a valid email address'),

body('password')
.matches(strongPasswordRegex)
.withMessage('Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number'),
body('confirmPassword')
  .notEmpty()
  .withMessage('Confirm password is required')
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password dose not match');
    }
    return true;
  }),

body('confirmedEmail')
  .notEmpty()
  .withMessage('Confirmed email is required')
  .custom((value, { req }) => {
    if (value !== req.body.email) {
      throw new Error('Email dose not match');
    }
    return true;
  }),
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
  
  module.exports = validateRegistration

