var db = require('../db.js');
var Sequelize = require('sequelize');

module.exports = db.sequelize.define('Image', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    path: {
        type: Sequelize.STRING,
        allowNull: false
    },
    answer: {
        type: Sequelize.JSON,
        allowNull: false
    }
});
