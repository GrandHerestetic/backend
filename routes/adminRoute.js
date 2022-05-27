const express = require('express')
const router = express.Router()
const path = require('path')
const filmController = require('../controllers/filmController')

router
    .route('/')
    .get((req, res) => res.render(path.resolve('views/admin.ejs'), {
        title: 'Admin page',
        activePage: 'index'
    }))

router.post('/addFilm', filmController.addFilm)
router.post('/deleteFilm', filmController.deleteFilm)

module.exports = router