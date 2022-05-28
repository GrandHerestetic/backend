const express = require('express')
const router = express.Router()
const path = require('path')
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          required:
 *              -title
 *              -img
 *           properties:
 *              id:
 *                  type: string
 *                  description: Auto-generated id of product
 *              title:
 *                  type: string
 *                  description: Title of product
 *              img:
 *                  type: string
 *                  description: Image of product
 *              example:
 *                  id:DFE_21
 *                  title: Test
 *                  img: test
 */

router
    .route("/")
    .get( (req,res) => res.render(path.resolve('views/home.ejs')));

module.exports = router