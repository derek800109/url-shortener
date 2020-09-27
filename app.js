const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const bodyParser = require('body-parser')// 引用 body-parser
// const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const PORT = process.env.PORT || 3000

// -------------------------------------------------------------------------------

app.use(express.static('public'))

// -------------------------------------------------------------------------------

// require express-handlebars here
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// -------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理

// -------------------------------------------------------------------------------

app.use(routes)

// -------------------------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`Express is listening on  http://localhost:${PORT}`)
})