const jwt = require('jsonwebtoken')
const { secretKey } = require('../config')

// этот мидлвар как пример что можна и так сделать
// потому что он уже у нас написан в файле app
module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') next()

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.status(403).json({message: 'user is Unauthorised'})
        }
        const decodedData = jwt.verify(token,secretKey)
        req.user = decodedData
        
        next()
    } catch (error) {
        console.log('AUTH_MIDDLEWARE => ERROR: ', error);
        res.status(403).json({message: 'user is Unauthorised'})
    }
}