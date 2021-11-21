const Sequelize = require('sequelize');
const initModels = require('./init-models');

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

module.exports = {
    sequelize,
    models: initModels(sequelize),
};