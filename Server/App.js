const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRoute = require('./Routes/User_Auth')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/', authRoute)

module.exports = app
