const express = require('express')
const router = express.Router()
const path = require('path')
const controllerProduct = require('../controllers/controllerProduct')
const modelUser = require('../models/modelUser')
const controllerUser = require('../controllers/controllerUser')
const {check} = require("express-validator")
const middlewareAuth = require("../middlewaree/middlewareAuth")
const middlewareRole = require("../middlewaree/middlewareRole")

router
    .route("/")
    .get( async (req,res) =>{
        const user = await modelUser.find()
        res.render(path.resolve('views/login.ejs'), {
            activePage: 'login',
            user: user,
        })
    });

router.post('/registration', [
    //check('username',"Username can not be empty").notEmpty(),
    //check('password',"Password should be more than 4 and less than 10").isLength({min: 4, max: 10})
], controllerUser.registration)
router.post('/login', controllerUser.login)
router.get('/users', middlewareAuth,  controllerUser.logout)

module.exports = router