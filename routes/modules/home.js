const express = require('express')

const urlShortener = require('../../models/urlShortner')

const Router = express.Router()

//----------------------------------------------------------------------------------

Router.get('/', (req, res) => {
  console.log('this is a home page log')

  res.render('index')
})

//----------------------------------------------------------------------------------

Router.post('/', (req, res) => {
  console.log('This post is used to create outputURL')

  res.render('index')
})

//----------------------------------------------------------------------------------

module.exports = Router