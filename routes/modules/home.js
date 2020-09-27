const express = require('express')

const random_alphabets = require('../../utilities/random_alphabets')
const UrlShortener = require('../../models/urlShortner')

//----------------------------------------------------------------------------------

const Router = express.Router()

//----------------------------------------------------------------------------------

Router.get('/', (req, res) => {
  console.log('this is a home page log')

  res.render('index', { showShortenURL: false })
})

//----------------------------------------------------------------------------------

Router.post('/', (req, res) => {
  console.log('This post is used to create outputURL')
  const inputURL = req.body.inputURL

  UrlShortener
    .find()
    .lean()
    .then(urlShorteners => {
      let shortenPath = ''
      let urlShortener = urlShorteners.find(doc => doc.inputURL === inputURL)
      console.log('urlShortener', urlShortener)
      console.log('urlShorteners', urlShorteners)

      if (urlShortener === undefined) {
        // create a new ducument
        shortenPath = random_alphabets.get_new_random_string(5)
        const urlShortener = new UrlShortener({ inputURL, shortenPath })

        urlShortener.save()

        console.log('not found')
      }
      else {
        // return this shortenPath
        shortenPath = urlShortener.shortenPath
        console.log('found')
      }

      const shortenURL = `/${shortenPath}`

      res.render('index', { shortenURL, showShortenURL: true })
    })
    .catch(error => console.error(error))
})

//----------------------------------------------------------------------------------

module.exports = Router