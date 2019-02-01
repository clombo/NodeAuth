//TODO: Make sure to change before comitting to github
const Sequelize = require('sequelize');
module.exports = new Sequelize('NodeAuth', 'clombo', '123456', {
  host: 'CLOMBO',
  port: '64828',
  dialect: 'mssql',
  operatorsAliases: false,
  dialectOptions:{
    instanceName: 'SQLEXPRESS'
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

});
