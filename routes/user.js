const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

// 登入頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 登入
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      req.flash('warning_msg', '請填上您的Email和Password')
      return res.redirect('/users/login')
    }

    req.logIn(user, err => {
      if (err) {
        return next(err)
      }
      return res.redirect('/')
    })
  })(req, res, next)
})

// 註冊頁面
router.get('/register', (req, res) => {
  res.render('register')
})

// 註冊
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: '每個欄位都是必填' })
  }
  if (password !== password2) {
    errors.push({ message: '密碼輸入錯誤，請重新輸入' })
  }

  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 })
  } else {
    User.findOne({ where: { email: email } }).then(user => {
      if (user) {
        console.log('User already exists')
        res.render('register', { name, email, password, password2 })
      } else {
        const newUser = new User({ name, email, password })

        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(newUser.password, salt))
          .then(hash => {
            newUser.password = hash
            newUser.save()
            res.redirect('/')
          })
      }
    })
      .catch(err => console.log(err))
  }
})

// 登出
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '已成功登出')
  res.redirect('/users/login')
})

module.exports = router