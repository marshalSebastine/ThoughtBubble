const sequelize = require("./model.index");
const { DataTypes } = require("sequelize");
const {isValidPassword} = require("../utils/validation.utils");

const Account = sequelize.define('Account', {

  // id column will be autogenerated which will be the primary key

  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: { isEmail: true }
  },
  // blowfish encrypted hash output
  password: {
    type: DataTypes.CHAR(60),
    allowNull: false,
    validate: {
      isSufficientlyComplex(val) {
        if (!isValidPassword(val)) {
          throw new Error("password does not meet requirements")
        }
      }
    }
    ,
  },
  // postgresl do not support tinyint and unsigned int
  role: { type: DataTypes.SMALLINT, allowNull: false },
  // the length of phone number across countries varies from 3-14
  phoneNumber: { type: DataTypes.STRING(14), unique: true },

  userName: { type: DataTypes.STRING, allowNull: false, unique: true },

  //createdAt and updatedAt will also be added automatically

}, {
  tableName: 'Accounts',
  timestamps: true
})

module.exports = Account