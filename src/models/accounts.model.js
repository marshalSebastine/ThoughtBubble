const sequelize = require("./model.index");
const { DataTypes } = require("sequelize");

const Account = sequelize.define('Account', {
    email: {type: DataTypes.STRING,allowNull: false}
},{
    tableName: 'Accounts'
  })

module.exports = Account