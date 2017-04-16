'use strict';

const db = require('../config/db.js');
const Sequelize = require('sequelize');

module.exports = db.sequelize.define('Result', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    questId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    imageId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    userAnswer: {
        type: Sequelize.JSON,
        allowNull: false
    }
});
