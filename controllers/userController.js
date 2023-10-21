const postValidator = require('../validators/validationResult')

const User = require('../models/User')
const Role = require('../models/Role')

exports.getAllUsers = (req, res) => {
  const users = User.find()
  .select('_id username roles password')
  .then((users)=>{
    res.json({users})
  }).catch(error => {
    console.log('GET_ALL_USERS => ERROR: ',error);
  })
}

exports.createUser = async (req, res) => {
  const errors = postValidator(req, res)

  if(errors) {
   return res.status(400).json({ errors: errors });

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

  user.save().then((data)=>{
    res.json({
      user: data
    })
  }).catch(error => {
    console.log('ERROR => CREATE-USER', error);
    //  or ssend error in middleware handlerErrors
    next(error)
  })
}

exports.createRole = async (req, res) => {
 try {
    const userRole = new Role()
    const adminRole = new Role({value: 'ADMIN'})

    await userRole.save()
    await adminRole.save()

    res.json('server works')
 } catch (error) {
    
 }
}

exports.deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany()
    res.json({message: 'users were deleted all'})
  } catch (error) {
    console.log('DELETE_ALL => ERROR:', error);
  }
}