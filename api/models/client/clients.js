const { DataTypes } = require ('sequelize');
const sequelize = require ('../../db');

const client = sequelize.define('clients', {
    name: {
        type: DataTypes.STRING,
    }
});

client.sync({ alter: true});
module.exports = client;