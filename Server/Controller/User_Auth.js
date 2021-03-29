const Users = require('../Model/User_Auth_Schema')
const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config()

const accountSID = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const serviceID = process.env.TWILIO_SERVICE_ID

const client = require('twilio')(accountSID, authToken)

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN

const smsKey = process.env.SMS_SECRET_KEY

//Old OTP Code

// exports.createOTP = async (req, res) => {
//   const phone = `+91${req.body.phone}`
//   const otp = Math.floor(100000 + Math.random() * 900000)
//   const ttl = 2 * 60 * 1000
//   const expires = Date.now() + ttl
//   const data = `${phone}.${otp}.${expires}`
//   const hash = crypto.createHmac('sha256', smsKey).update(data).digest('hex')
//   const fullHash = `${hash}.${expires}`

//   await client.messages
//     .create({
//       body: `Your One Time password is ${otp} `,
//       from: +13853931852,
//       to: phone,
//     })
//     .then((messages) => console.log(messages))
//     .catch((err) => console.error(err))

//   res.status(200).send({ phone, hash: fullHash })
// }

//Send OTP
exports.createOTP = async (req, res) => {
  const phone = `+91${req.body.phone}`
  const channel = req.body.channel

  await client.verify
    .services(serviceID)
    .verifications.create({
      to: phone,
      channel: channel,
    })
    .then((data) => {
      console.log(data),
        res.status(200).send('OTP has been sent to your phone.')
    })
    .catch((err) => {
      console.error(err),
        res.status(400).send('Please input a valid Phone Number')
    })
}

//Verify OTP
exports.createVerifyOTP = async (req, res) => {
  const phone = `+91${req.body.phone}`
  const otp = req.body.otp
  await client.verify
    .services(serviceID)
    .verificationChecks.create({
      to: phone,
      code: otp,
    })
    .then((data) => {
      console.log(data), res.status(200).send('Hey! buddy, You got verified')
    })
    // .then(async () => {
    //   try {
    //     let users = await Users.create({
    //       phone: phone,
    //     })
    //     return res.status(200).send(users)
    //   } catch (error) {
    //     return res.status(400).send(error)
    //   }
    // })
    .catch((err) => {
      console.error(err), res.status(400).send('Your OTP is incorrect!!!')
    })
}

// Create User
const createUser = async (req, res) => {
  try {
    let users = await Users.create({
      phone: req.body.phone,
    })
    return res.status(200).send(users)
  } catch (error) {
    res.status(400).send(error)
  }
}
