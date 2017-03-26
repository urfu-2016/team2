'use strict';

const Sequelize = require('sequelize');
const db = require('../config/db');

module.exports = db.sequelize.define('Like', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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
