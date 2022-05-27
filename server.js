const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const ejs = require('ejs')
const app = express();
const PORT = 8080;


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})


app.set('view engine', ejs);
app.engine('ejs', require('ejs').__express);

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', require('./routes/indexRoute'))
app.use('/about', require('./routes/aboutRoute'))
app.use('/signup', require('./routes/signupRoute'))
app.use('/admin', require('./routes/adminRoute'))

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://sbeknur:qwerty123@cluster0.im96e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(process.env.PORT || PORT, () =>
            console.log(`App listening at localhost: ${PORT}`)
        )
    } catch (e) {
        console.log(e)
    }
}

start()