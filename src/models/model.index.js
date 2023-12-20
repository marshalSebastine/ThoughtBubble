const {Sequelize} = require('sequelize');
const config = require("../config/config");

const sequelize = Sequelize(config.dbname,
                            config.dbusrname,
                            config.dbpsswd,
                            {host:config.host,dialect: config.dialect})

module.exports = sequelize