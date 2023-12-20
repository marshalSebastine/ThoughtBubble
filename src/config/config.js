
const dotenv = require('dotenv');
const Joi = require('joi');


dotenv.config()

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    DBNAME: Joi.string().default("localdb"),
    DBPSSWD: Joi.string().default(),
    DBUSRNAME: Joi.string().default(),
    HOST: Joi.string().required(),
    DIALECT: Joi.string().required()

}).unknown()


const { value: envVars, error } = envVarsSchema.prefs({errors: {label: 'key'}}).validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    dbname: process.env.DBNAME,
    dbusrname: process.env.DBUSRNAME,
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    dbpsswd: process.env.DBPSSWD    
}