require('./config/db')

const admin = require('./routes/routerAdmin')
const main = require ('./routes/routerIndex')
const about = require ('./routes/routerAboutUs')
const products = require ('./routes/routerProducts')
const auth = require('./routes/routerAuth')
const login = require('./routes/routerLogin')

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000 || process.env.PORT;
const path = require('path')
const ejs = require('ejs')

const cors = require('cors')
const morgan = require('morgan')
const swaggerUI = require("swagger-ui-express")
const swaggerJsDoc = require("swagger-jsdoc")
const url = require("url");


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
app.use('/login', login)


app.use(cors())
app.use(morgan("dev"))

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Web API",
            version :"1.0.0",
            description: "A simple programm"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["/routes/*.js"]
}

const specs = swaggerJsDoc(option)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

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