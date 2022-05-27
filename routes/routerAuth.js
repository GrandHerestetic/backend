const express = require('express')
const router = express.Router()
const path = require('path')
const controllerProduct = require('../controllers/controllerProduct')
const modelProduct = require('../models/modelProduct')


router
    .route("/")
    .get( async (req,res) =>{
        const product = await modelProduct.find()
        res.render(path.resolve('views/auth.ejs'), {
            activePage: 'auth',
            product: product,
        })
    });

router.post('/addProduct', controllerProduct.addProduct)
router.post('/addProduct', controllerProduct.deleteProduct)

module.exports = router