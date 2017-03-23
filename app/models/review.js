'use strict';

const Sequelize = require('sequelize');
const db = require('../config/db');

/**
 * Модель просмотра
 * @type {Model}
 */
module.exports = db.sequelize.define('Review', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    dateTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    ipAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userAgent: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    /**
     *  Просмотр является визитом, если последний визит данного
     *  пользователя был не раньше, чем 30 минут назад
     */
    isVisit: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});
