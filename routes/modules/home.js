const express = require('express')

const random_alphabets = require('../../utilities/random_alphabets')
const urlShortener = require('../../models/urlShortner')

//----------------------------------------------------------------------------------

const Router = express.Router()

//----------------------------------------------------------------------------------

Router.get('/', (req, res) => {
  console.log('this is a home page log')
  console.log(random_alphabets.get_series_random_string(5))

  res.render('index')
})

//----------------------------------------------------------------------------------

Router.post('/', (req, res) => {
  console.log('This post is used to create outputURL')

  res.render('index')
})

//----------------------------------------------------------------------------------

module.exports = Router