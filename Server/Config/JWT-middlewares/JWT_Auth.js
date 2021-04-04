const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN

const authenticateUser = async (req, res, next) => {
  const accessToken = await req.cookies.accessToken

  jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
    if (phone) {
      req.phone = phone
      next()
    } else if (err.message === 'TokenExpiredError') {
      return res.status(403).send({
        success: false,
        msg: 'Access token expired',
      })
    } else {
      console.log(err)
      return res.status(403).send({ err, msg: 'User not authenticated' })
    }
  })
}

module.exports = authenticateUser
