const mongoose = require('mongoose')

const Schema = mongoose.Schema

const urlShortenerSchema = new Schema({
  inputURL: {
    type: String,
    trim: true,
    required: true
  },
  outputURL: {
    type: String,
    trim: true,
    required: true
  }
})

module.exports = mongoose.model("UrlShortener", urlShortenerSchema)