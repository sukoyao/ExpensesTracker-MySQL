const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Handlebars = require('handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const mongoose = require('mongoose')
const db = require('./models')
const { authenticated } = require('./config/auth')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

Handlebars.registerHelper('switch', (value, options) => {
  this.switch_value = value
  this.switch_break = false
  return options.fn(this)
})

Handlebars.registerHelper('case', (value, options) => {
  if (value == this.switch_value) {
    this.switch_break = true
    return options.fn(this)
  }
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(flash())

app.use(
  session({
    secret: 'your secret',
    resave: 'false',
    saveUninitialized: 'false'
  })
)

app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use((req, res, next) => {
  res.locals.user = req.user
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// routes
app.use('/users', require('./routes/user'))
app.use('/auth', require('./routes/auths'))
app.use('/filter', authenticated, require('./routes/filter'))
app.use('/', authenticated, require('./routes/home'))
app.use('/records', authenticated, require('./routes/record'))

app.listen(process.env.PORT || 3000, () => {
  db.sequelize.sync()
  console.log('App is running: localhost:3000')
})