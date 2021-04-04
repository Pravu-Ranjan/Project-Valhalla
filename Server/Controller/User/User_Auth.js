const dotenv = require('dotenv')
dotenv.config()

const jwt = require('jsonwebtoken')

const accountSID = process.env.TWILIO_ACCOUNT_SID2
const authToken = process.env.TWILIO_AUTH_TOKEN2
const serviceID = process.env.TWILIO_SERVICE_ID2

const client = require('twilio')(accountSID, authToken)

const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN
let refreshTokens = []

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
        res.status(202).send({ message: 'OTP has been sent to your phone.' })
    })
    .catch((err) => {
      console.error(err),
        res.status(403).send({ message: 'Please input a valid Phone Number' })
    })
}

//new Verify OTP
exports.createVerifyOTP = async (req, res) => {
  const phone = `+91${req.body.phone}`
  const otp = req.body.otp
  try {
    let verify = await client.verify
      .services(serviceID)
      .verificationChecks.create({
        to: phone,
        code: otp,
      })

    if (verify.valid === true) {
      console.log(verify)

      const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
        expiresIn: '30s',
      })
      const refreshToken = jwt.sign({ data: phone }, JWT_REFRESH_TOKEN, {
        expiresIn: '1y',
      })
      refreshTokens.push(refreshToken)

      res
        .status(202)
        .cookie('accessToken', accessToken, {
          expiresIn: new Date(new Date().getTime() + 30 * 1000),
          sameSite: 'strict',
          httpOnly: true,
        })
        .cookie('refreshToken', refreshToken, {
          expires: new Date(new Date().getTime() + 31557600000),
          sameSite: 'strict',
          httpOnly: true,
        })
        .cookie('refreshToken', true, {
          expires: new Date(new Date().getTime() + 31557600000),
        })
        .cookie('authSession', true, {
          expires: new Date(new Date().getTime() + 30 * 1000),
          sameSite: 'strict',
        })
        .send({
          verification: true,
          message: 'Hey! buddy, You got verified. Logging in to your account',
          accessToken: accessToken,
        })
    } else {
      throw new Error()
    }
  } catch (error) {
    return (
      console.error(error),
      res
        .status(403)
        .send({ verification: false, message: 'Your OTP is incorrect!!!' })
    )
  }
}

exports.refresh = async (req, res) => {
  const refreshToken = await req.cookies.refreshToken
  if (!refreshToken)
    return res
      .status(403)
      .send({ message: `refresh token not found, Please login again` })
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).send({ message: 'Refresh token blocked' })

  jwt.verify(refreshToken, JWT_REFRESH_TOKEN, (err, phone) => {
    if (!err) {
      const accessToken = jwt.sign({ data: phone }, JWT_AUTH_TOKEN, {
        expiresIn: '30s',
      })
      res
        .status(202)
        .cookie('accessToken', accessToken, {
          expiresIn: new Date(new Date().getTime() + 30 * 1000),
          sameSite: 'strict',
          httpOnly: true,
        })
        .cookie('authSession', true, {
          expires: new Date(new Date().getTime() + 30 * 1000),
        })
        .send({ previousSessionExpiry: true, success: true })
    } else {
      return res
        .status(403)
        .send({ message: `Invalid Refresh TokenExpiredError` })
    }
  })
}

exports.logout = (req, res) => {
  res
    .clearCookie('refreshToken')
    .clearCookie('accessToken')
    .clearCookie('authSession')
    .clearCookie('refreshTokenID')
    .send('logout')
}

exports.home = (req, res) => {
  console.log('home private route')
  res.status(202).send('Private Protected Route - Home')
}
