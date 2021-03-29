const router = require('express').Router()

const Auth = require('../Controller/User_Auth')

//Send OTP to user Phone
router.post('/sendOTP', Auth.createOTP)

//Verify OTP
router.post('/verifyOTP', Auth.createVerifyOTP)

//Save User
// router.post('/user', Auth.createUser)

module.exports = router
