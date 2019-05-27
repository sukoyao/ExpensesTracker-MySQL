const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User

router.get('/', (req, res) => {
  const user = User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Record.findAll({
        where: {
          UserId: req.user.id
        }
      })
    })
    .then(records => {
      let totalAmount = 0
      for (record of records) {
        totalAmount += record.amount
      }

      return res.render('index', { records, totalAmount })
    })
})
  .catch(error => {
    return res.status(422).json(error)
  })


module.exports = router