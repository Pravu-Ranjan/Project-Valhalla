const dbConfig = require('./Config/DB_Config')
const mongoose = require('mongoose')

mongoose.connect(dbConfig.mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const db = mongoose.connection

module.exports = db
