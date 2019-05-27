const express = require('express')
const router = express.Router()
const db = require('../models')
const Record = db.Record
const User = db.User

// Create page
router.get('/new', (req, res) => {
  return res.render('new')
})

// Create post
router.post('/', (req, res) => {
  Record.create({ ...req.body, UserId: req.user.id })
    .then(record => {
      return res.redirect('/')
    })
    .catch(err => {
      return res.status(422).json(err)
    })
})

// edit page
router.get('/:id/edit', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Record.findOne({
        where: {
          Id: req.params.id,
          UserId: req.user.id
        }
      })
    })
    .then(record => {
      return res.render('edit', { record })
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

// edit post
router.put('/:id', (req, res) => {
  Record.findOne({
    where: {
      Id: req.params.id,
      UserId: req.user.id
    }
  })
    .then(record => {
      Object.assign(record, req.body)

      return record.save()
    })
    .then(record => {
      return res.redirect('/')
    })
    .catch(err => {
      return res.status(422).json(err)
    })
})

// delete post
router.delete('/:id/delete', (req, res) => {
  User.findByPk(req.user.id)
    .then(user => {
      if (!user) throw new Error('User not found')

      return Record.destroy({
        where: {
          UserId: req.user.id,
          Id: req.params.id
        }
      })
    })
    .then(record => {
      return res.redirect('/')
    })
    .catch(error => {
      return res.status(422).json(error)
    })
})

module.exports = router