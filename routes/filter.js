const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User
const Sequelize = require('sequelize')

router.get('/month/:month', (req, res) => {
  const month = `____-${req.params.month}-__`
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Record.findAll({
        where: {
          UserId: req.user.id,
          Date: { [Sequelize.Op.like]: `${month}` }
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
    .catch(error => {
      return res.status(422).json(error)
    })
})

router.get('/category/:category', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Record.findAll({
        where: {
          UserId: req.user.id,
          Category: req.params.category
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
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router