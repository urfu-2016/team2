'use strict';

const db = require('../config/db.js');
const Sequelize = require('sequelize');

const User = require('./user');
const Image = require('./image');
const Quest = require('./quest');

const Result = db.sequelize.define('Result', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userAnswer: {
        type: Sequelize.JSON,
        allowNull: false
    }
});

User.hasMany(Result, {foreignKey: 'userId'});
Result.belongsTo(User, {foreignKey: 'userId'});

Image.hasMany(Result, {foreignKey: 'imageId'});
Result.belongsTo(Image, {foreignKey: 'imageId'});

Quest.hasMany(Result, {foreignKey: 'questId'});
Result.belongsTo(Quest, {foreignKey: 'questId'});

module.exports = Result;
