const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')

module.exports = (roles) => (
    (req, res, next) => {
    if(req.method === 'OPTIONS') next()

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(403).json({message: 'user is not authorised'})
        }
        const decodedData = jwt.verify(token,secretKey)
        const {roles: userRoles} = decodedData
        let hasRole = false
        userRoles.forEach(role => {
            if(roles.includes(role)) {
                hasRole = true
            }
        })        
        if(!hasRole) {
            return res.status(403).json({message: 'user doesn"t have rights' })
        }
        next()
    } catch (error) {
        console.log('AUTH_MIDDLEWARE => ERROR: ', error);
        res.status(403).json({message: 'user doesn"t have rights'})
    }
}
)