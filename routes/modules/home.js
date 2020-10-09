const express = require('express')

const random_alphabets = require('../../utilities/random_alphabets')
const UrlShortener = require('../../models/urlShortner')
const urlShortner = require('../../models/urlShortner')

//----------------------------------------------------------------------------------

const Router = express.Router()

//----------------------------------------------------------------------------------

Router.get('/', (req, res) => {
  console.log('this is a home page log')

  res.render('index', { showShortenURL: false })
})

//----------------------------------------------------------------------------------

function get_shorten_url(req, shortenPath) {
  return `${req.protocol}${req.hostname}:${req.po}/${shortenPath}`
}

Router.post('/', (req, res) => {
  console.log('This post is used to create outputURL')
  const inputURL = req.body.inputURL
  if (inputURL === '') {
    return res.redirect('/')
  }
  console.log(inputURL)

  UrlShortener
    .find()
    .lean()
    .then(urlShorteners => {
      let shortenPath = ''
      let urlShortener = urlShorteners.find(doc => doc.inputURL === inputURL)

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

      // const shortenURL = get_shorten_url(req, shortenPath)
      const shortenURL = `${req.protocol}://${req.get('host')}/${shortenPath}`

      res.render('index', { shortenURL, showShortenURL: true })
    })
    .catch(error => console.error(error))
})

//----------------------------------------------------------------------------------

Router.get('/:shortenPath', (req, res) => {
  const shortenPath = req.params.shortenPath

  UrlShortener
    .findOne({ shortenPath })
    .lean()
    .then(urlShortner => {
      if (urlShortner === null) {
        return res.redirect('/')
      }

      const inputURL = urlShortner.inputURL
      // 301 is an express status code to navigate to a new url rather than append sentence to postfix of host
      res.redirect(301, inputURL)
    })
    .catch(error => console.error(error))
})

//----------------------------------------------------------------------------------

module.exports = Router

// creat route to get new created shorten url 