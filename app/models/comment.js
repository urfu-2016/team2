'use strict';

const Sequelize = require('sequelize');
const db = require('../config/db');

const Quest = require('./quest.js');
const User = require('./user.js');

const Comment = db.sequelize.define('Comment', {
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
    }
});

User.hasMany(Comment, {foreignKey: 'userId'});
Comment.belongsTo(User, {foreignKey: 'userId'});

Quest.hasMany(Comment, {foreignKey: 'questId'});
Comment.belongsTo(Quest, {foreignKey: 'questId'});

module.exports = Comment;
