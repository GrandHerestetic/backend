const express = require('express')
const router = express.Router()
const path = require('path')
const modelProduct = require('../models/modelProduct')


router
    .route("/")
    .get( async (req,res) => {
        const product = await modelProduct.find()
        res.render(path.resolve('views/products.ejs'),{
            activePage: 'products',
            product: product,
        })
    });

module.exports = router