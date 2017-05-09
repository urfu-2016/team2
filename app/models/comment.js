'use strict';

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define('Comment', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    }
});
