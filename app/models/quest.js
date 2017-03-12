var db = require('../db.js');
var Sequelize = require('sequelize');

module.exports = db.sequelize.define('Quest', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    authorId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
});
