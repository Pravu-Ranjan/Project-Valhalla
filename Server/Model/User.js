const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  // name: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  // address: {
  //   pincode: {
  //     type: Number,
  //     required: true,
  //   },
  //   state: {
  //     type: String,
  //     required: true,
  //   },
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  //   residence: {
  //     type: String,
  //     require: true,
  //   },
  //   area: {
  //     type: String,
  //     required: true,
  //   },
  // },
})

const Users = mongoose.model('users', userSchema)

module.exports = Users
