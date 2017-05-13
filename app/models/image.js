'use strict';

const db = require('../config/db.js');
const Sequelize = require('sequelize');
const Quest = require('./quest.js');

const Image = db.sequelize.define('Image', {
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

Quest.hasMany(Image, {foreignKey: 'questId'});

module.exports = Image;
