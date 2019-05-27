module.exports = {
  authenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '需要登入才能使用')
    res.redirect('/users/login')
  }
}