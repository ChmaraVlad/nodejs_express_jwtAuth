const { check } = require('express-validator');
const express = require('express')

const { registration, login } = require('../controllers/authController');

const router = express.Router()

router.post('/registration', [
  check('username', 'username is require').notEmpty(),
   check('username', 'username must bu between 2 and 12 letters').isLength({ min: 2, max: 30 }),

  check('password', 'password is require').notEmpty(),
   check('password', 'password must bu between 2 and 12 letters').isLength({ min: 2, max: 12 }),
], registration)


router.post('/login', [
  check('username', 'username is require').notEmpty(),
   check('username', 'username must bu between 2 and 12 letters').isLength({ min: 2, max: 30 }),

  check('password', 'password is require').notEmpty(),
   check('password', 'password must bu between 2 and 12 letters').isLength({ min: 2, max: 12 }),
], login)

module.exports = router