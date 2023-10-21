const { mockedUsers } = require("../mockedData")

const bcrypt = require('bcryptjs')

// for generating and verifiyng jwt
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const Role = require("../models/Role")
const validationResult = require("../validators/validationResult")

// from config
const {secretKey} = require('../config')


const generatAccessToken = (id, roles) => {
   const payload = {id, roles}
   return jwt.sign(payload, secretKey, {expiresIn: '24h'})
}

exports.registration = async (req, res) => {
   try {

      const errors = validationResult(req, res)

      if(errors) {
         return res.status(400).json({ message: 'Error during Registration' ,errors: errors });

      //  or send error in middleware handlerErrors
      // next(error)
      // return
      }

      const {username, password, roles} = req.body
      const candidate = await User.findOne({username})

      if(candidate) {
         return res.status(400).json({message: 'User exist'})
      }

      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({value: 'USER'})
      const usersRoles = roles?.length ? roles : [userRole.value]
      const user = new User({username, password: hashPassword, roles: usersRoles})
      await user.save()

      res.json({message: 'User was created successfuly'})

   } catch (error) {
      console.log('REGISTRATION => ERROR: ', error);
      res.status(400).json({message: 'Registration error'})
   }
}

exports.login = async (req, res) => {
   try {
       const errors = validationResult(req, res)

      if(errors) {
         return res.status(400).json({ errors: errors });

      //  or send error in middleware handlerErrors
      // next(error)
      // return
      }

      const {username, password} = req.body
      const userDb = await User.findOne({username})

      if(!userDb) {
         return res.status(400).json({message: 'Login Error'})
      }
      const isValidPassword = bcrypt.compareSync(password, userDb.password)
      if(!isValidPassword) {
         return res.status(400).json({message: 'Password not valid'})
      }
      const token = generatAccessToken(userDb._id, userDb.roles)

      res.json({token})
   } catch (error) {
      console.log('LOGIN => ERROR: ', error);
      res.status(400).json({message: 'Login error'})
   }
}