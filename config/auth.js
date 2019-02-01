module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      console.log(req.isAuthenticated());
      return next();
    }
    req.flash('error_msg', 'Please make sure to log in');
    res. redirect('/users/login');
  }
}
