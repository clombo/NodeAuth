const Sequelize = require('sequelize');
const db = require('../config/database.js');


const User = db.define('user', {
  uName:{
    type: Sequelize.STRING
  },
  email:{
    type: Sequelize.STRING
  },
  uPassword:{
    type: Sequelize.STRING
  },
  InsertDate:{
    type: Sequelize.DATE
  }
}, {
  timestamps: false
});

module.exports = User;
