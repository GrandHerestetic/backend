const jwt = require('jsonwebtoken')
const {
    secret
} = require('../config/config')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const cookies = req.cookies
        const token = cookies.token
        if (!token) {
            return res.redirect('/auth')
        }
        const decodedData = jwt.verify(token, secret)
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({
            message: 'Error. The user is not logged in'
        })
    }
}