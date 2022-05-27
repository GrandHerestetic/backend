require('./config/db')

const admin = require('./routes/routerAdmin')
const main = require ('./routes/routerIndex')
const about = require ('./routes/routerAboutUs')
const products = require ('./routes/routerProducts')
const auth = require('./routes/routerAuth')

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000 || process.env.PORT;
const path = require('path')
const ejs = require('ejs')


app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');


app.use(express.static( 'public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.use('/', main)
app.use('/home', about)
app.use('/products', products)
app.use('/admin', admin)
app.use('/auth', auth)

const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://Test:test1234@cluster0.minhf.mongodb.net/?retryWrites=true&w=majority")
        app.listen(process.env.PORT || 3000, function (){
            console.log('http://localhost:3000', this.address().port, app.settings.env);
        })
    } catch (e) {
        console.log(e)
    }
}

start()