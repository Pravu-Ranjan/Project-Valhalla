const Users = require('../../Model/User')

exports.create = async (req, res) => {
  try {
    let phone = req.body.phone

    if (phone.length != 13) {
      throw new Error()
    } else {
      let user = await Users.create({
        phone: req.body.phone,
      })
      res.status(202).send({
        message: 'New User Created',
        user: user,
      })
    }
  } catch (error) {
    console.log(error)
    res.status(403).send({
      message: 'Cannot create your Account, Please check your phone Number.',
    })
  }
}

exports.findAll = async (req, res) => {
  try {
    let users = await Users.find({})
    return res.status(202).send({
      message: 'All Users Data',
      users: users,
    })
  } catch (error) {
    console.log(error)
    res.status(403).send({
      message: 'Cannot find any user in the database',
    })
  }
}
