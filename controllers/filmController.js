const filmModel = require('../models/filmModel')

class filmController {
   async addFilm(req, res) {
      try {
         const film = new filmModel({
            title: req.body.filmTitle,
            img: req.body.filmImg
         })
         await film.save()
         res.redirect('/admin')
      } catch (e) {
         console.log(e)
      }
   }
   async deleteFilm(req,res){
      try{
         const filmTitle = req.body.filmDel
         const film = await filmModel.findOneAndDelete({title:filmTitle})
         res.redirect('/admin')
      } catch (e){
         console.log(e)
      }
   }

}

module.exports = new filmController()