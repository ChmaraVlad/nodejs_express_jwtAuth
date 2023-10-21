const express = require('express')

// controllers
const {mainController} = require('../controllers/index')
const {registration, login} = require('../controllers/authController')

// routes
const protectedRoute = require('./protected')
const postRoute = require('./post')
const userRoute = require('./user')
const authRouter = require('./authRouter')

const router = express.Router()

// auth
router.use('/auth', authRouter)

// protected route
router.use('/users', protectedRoute)

router.use('/post', postRoute)
router.use('/user', userRoute)

router.use('/',  mainController)




module.exports = router