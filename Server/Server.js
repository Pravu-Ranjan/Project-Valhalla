const app = require('./App')
const db = require('./Database')

require('dotenv').config()

const PORT = process.env.SERVER_PORT || 5001

//Database Connection

const DBConnection = () => {
  try {
    db.once('open', () => {
      console.log('Database Connected successfully!!!')
    })
  } catch {
    db.on('error', console.error.bind(console, 'connection error:'))
  }
}

app.listen(PORT, DBConnection(), () =>
  console.log(`Server up and running on port: ${PORT}`)
)
