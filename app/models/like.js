'use strict';

const Sequelize = require('sequelize');
const db = require('../config/db');

const Quest = require('./quest');
const User = require('./user');

const Like = db.sequelize.define('Like', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

Quest.hasMany(Like, {foreignKey: 'questId'});
Like.belongsTo(Quest, {foreignKey: 'questId'});
User.hasMany(Like, {foreignKey: 'userId'});
Like.belongsTo(User, {foreignKey: 'userId'});

module.exports = Like;
