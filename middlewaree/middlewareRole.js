const jwt = require("jsonwebtoken");
const {secret} = require("../config/config");
const {response} = require("express");
module.exports = function(roles) {
    return function(req, res, next) {
        if (req.method === "OPTION"){
            next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const {roles: userRoles} = jwt.verify(token, secret)
            let hasRole = false
            userRoles.forEach(role => {
                if(roles.includes(role)){
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "Access denied"})
            }
            next()
        } catch (e) {
            return res.status(403).json({message: "User is not registered"})
        }
    }
}