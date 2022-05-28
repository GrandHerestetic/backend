const modelUser = require('../models/modelUser')
const modelRole = require('../models/modelRole')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const {secret} = require("../config/config")
const cookieParser = require('cookie-parser')

const generateAccessToken = (id, roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "12h"})
}

class controllerUser {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.send(400).json({message: "Registration Error", errors})
            }
                const username = req.body.newUsername
                const password = req.body.newPassword
            const candidate = await modelUser.findOne({username})
            if (candidate) {
                return res.send(400).json({message:"User is already exist"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await modelRole.findOne({value: "USER"})
            const user = new modelUser({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            res.redirect('/auth')
        } catch (e) {
            console.log(e)
            return res.send(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const username = req.body.userUsername
            const password = req.body.userPassword
            const user = await modelUser.findOne({username})
            if (!user) {
                return res.send(400).json({message: `Username ${username} is not exist`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.send(400).json({message: `Invalid password`})
            }
            const token = generateAccessToken(user._id, user.roles)
            res.cookie('isAuth', true, {
                httpOnly: true
            })
            res.cookie('token', token, {
                httpOnly: true
            })
            console.log(e)
            return res.redirect('/')
        } catch (e) {
            console.log(e)
            res.status(400).json({
                message: 'Login error'
            })
        }
    }

    async logout(req, res) {
        res.cookie('token', '', {
            maxAge: 1
        })
        res.cookie('isAuth', false, {
            httpOnly: true
        })
        res.cookie('isAdmin', false, {
            httpOnly: true
        })
        res.redirect('/')
    }
}

module.exports = new controllerUser()