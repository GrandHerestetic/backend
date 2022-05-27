const {
    Schema,
    model
} = require('mongoose')

const modelProduct = new Schema({
    title: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    }
})

module.exports = model( 'Product', modelProduct)