'use strict';

const db = require('../config/db.js');
const Sequelize = require('sequelize');

const User = require('./user');
const Image = require('./image');
const Quest = require('./quest');

const Result = db.sequelize.define('Result', {
    userAnswer: {
        type: Sequelize.JSON,
        allowNull: false
    }
});

User.belongsToMany(Image, {
    through: Result,
    foreignKey: 'imageId'
});

Image.belongsToMany(User, {
    through: Result,
    foreignKey: 'userId'
});

Quest.hasMany(Result, {foreignKey: 'questId'});
Result.belongsTo(Quest, {foreignKey: 'questId'});

module.exports = Result;
