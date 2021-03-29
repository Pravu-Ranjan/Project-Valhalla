const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
})

const Users = mongoose.model('users', userSchema)

module.exports = Users
