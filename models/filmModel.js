const {
   Schema,
   model
} = require('mongoose')

const film = new Schema({
   title: {
      type: String,
      required: true
   },
   img: {
      type: String
      required: true
   }
})

module.exports = model('Films', film)