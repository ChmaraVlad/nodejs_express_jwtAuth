const { check } = require('express-validator');
const express = require('express')
const passport = require('passport');

// controllers
const {getAllUsers, createUser, createRole, deleteAllUsers} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router()

router.post('/create-new-role', createRole)

// using passport middleware for JWT auth
// initalized this passport in app,js
router.get('/',  passport.authenticate('jwt', {session: false}) , getAllUsers)

router.delete('/delete-all',  passport.authenticate('jwt', {session: false}) , deleteAllUsers)

// using authMiddleware for JWT auth - second way to make AUTH
// initalized this in authMiddleware.js
router.post('/', [
  check('username', 'username is require').notEmpty(),

  check('password', 'password is require').notEmpty(),
], createUser)

module.exports = router