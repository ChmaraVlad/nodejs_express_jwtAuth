const express = require('express')
const morgan = require('morgan')

// auth
// as auth middleware
const passport = require('passport')
// for implementing jwt strategy
const passportJWT = require('passport-jwt')

const {secretKey} = require('./config')

const dbConnect = require('./db/dbConnect')

// routes
const mainRoute = require('./routes/index')
const User = require('./models/User')

const app = express()
const port = 8080

// middleware for logs
app.use(morgan('dev'))

// parser
app.use(express.json())

// auth
app.use(passport.initialize())

// authorise your access using like middleware in any protected route
// есть еще другой вариант который реализован в authMiddleware.js
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey
}, (jwtPayload, done) => {
  const user = User.findById(jwtPayload.id)
  
  if(user) {
    return done(null, user)
  } else {
    return done(null, false)
  }
}))


// error handler 
app.use((error, req, res, next) => {
  if(error) console.log(error);
})

app.use('/', mainRoute)

const start = async () => {
  try {
    await dbConnect()
    app.listen(port, () => {
      console.log(`API listening on port ${port}`)
    })
  
} catch (error) {
  console.log('START => ERROR: ', error);
}
}

start()