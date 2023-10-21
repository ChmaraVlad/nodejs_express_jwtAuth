const express = require('express')
const router = express.Router()

const passport = require("passport");

const {protectedController} = require('../controllers/protected')

router.get('/', passport.authenticate('jwt', {session: false}) , protectedController)

module.exports = router