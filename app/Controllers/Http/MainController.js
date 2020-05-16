'use strict'

const axios = require('axios')

class MainController {
    index({ view }) {

    return view.render('cloud', {
        data: 'Ola mundico!'
    })
    }
     async store({request, view}){
         const music = request.input('music')
         const artist = request.input('artist')
         const key  = process.env.VAGALUME_API
         let letra = ''
         if ( music && artist){
            await axios.get("https://api.vagalume.com.br/search.php"
            + "?art=" + artist
            + "&mus=" + music,
            + `&apikey=${key}`).then((response) => { 
                if(response != undefined){
                     try{
                      letra = response.data.mus[0].text
                     }catch(err){
                         console.log(err)
                     }
                }else{
                    letra = "Music not found!"
                }
               })
         }
         return view.render('cloud', {
             data: letra
         })
     }
}

module.exports = MainController
