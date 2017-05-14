'use strict';

const Sequelize = require('sequelize');
const db = require('../config/db');

const User = db.sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    salt: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true
    },
    passwordResetToken: {
        type: Sequelize.TEXT,
        allowNull: true
    }
});

module.exports = User;
