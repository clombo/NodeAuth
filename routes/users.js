const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require('../models/User');
const sequelize = require('sequelize');
const passport = require('passport');

//router.get('/', (req, res))
router.get('/login', (req, res) => res.render('login'));

router.get('/register', (req, res) => res.render('register'));

//Register user begin
router.post('/register', (req, res) => {
  let {name, email, password, password2} = req.body;
  let errors = [];

  if(!name || !email || !password || !password2){
    errors.push({msg: "Please fill inall fields"});
  }

  if (password !== password2){
    errors.push({msg: "Passwords do not match"});
  }

  if(password.length < 6) {
    errors.push({msg: "Password should be at least 6 characters"});
  }

  if(errors.length > 0){
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  }else{

    bcrypt.genSalt(10, (err, salt) =>{
      bcrypt.hash(password, salt, (err, hash) => {
        if(err) throw err;
        password = hash;

        User
          .findOrCreate({
            where: {email},
            defaults:{uName: name, uPassword: password },
            attributes: ['email','uName','uPassword']
          })
          .spread((user, created) =>{
            if(created){
              req.flash(
                'success_msg',
                'You are now registered and can log in'
              );
              res.redirect('/users/login');
            }else{
              errors.push({msg: "User email already registered"});
              res.render('register',{
                  errors,
                  name,
                  email,
                  password: password2,
                  password2
              })
            }
          });
      })
    })
  }
});
//Register user end

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
