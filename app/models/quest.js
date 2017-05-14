'use strict';

const db = require('../config/db.js');
const Sequelize = require('sequelize');

const User = require('./user.js');

const Quest = db.sequelize.define('Quest', {
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
    description: {
        type: Sequelize.TEXT
    }
});

User.hasMany(Quest, {foreignKey: 'authorId'});
Quest.belongsTo(User, {foreignKey: 'authorId'});

module.exports = Quest;
