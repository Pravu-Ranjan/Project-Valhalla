const router = require('express').Router()

//User Authentication Controller
const Auth = require('../Controller/User/User_Auth')

//JWT Authentication
const authenticateUser = require('../Config/JWT-middlewares/JWT_Auth')

//User
const User = require('../Controller/User/User')

/*---------- User Authentation----------
------------Signup or Login----------*/

// Send OTP to user Phone
router.post('/sendOTP', Auth.createOTP)

// Verify OTP
router.post('/verifyOTP', Auth.createVerifyOTP)

//Refresh token
router.post('/refresh', Auth.refresh)

//Logout
router.get('/logout', Auth.logout)

//Save User
// router.post('/user', Auth.createUser)

/************************************ */

/*---------- User-----------*/

router.post('/home', authenticateUser, Auth.home)

router.post('/createUser', User.create)
router.get('/findAllUser', authenticateUser, User.findAll)

module.exports = router
