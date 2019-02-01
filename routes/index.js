const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')

router.get('/', (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.dataValues.uName
  })
);

module.exports = router;
