const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const allRoutes = require('./Routes/Routes')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', allRoutes)

module.exports = app
