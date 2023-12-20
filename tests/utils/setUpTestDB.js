const pg = require('pg');
const sequelize = require("../../src/models/model.index")


const setUpDB = () => {

    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await sequelize.drop()
          } catch (error) {
            console.error('Unable to connect to the database:', error);
          }
    })


    afterAll(async () => {
        await sequelize.drop()
        await sequelize.close()
    });
}

module.exports = setUpDB

