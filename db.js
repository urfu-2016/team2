'use strict';

var Sequelize = require('sequelize');
var url = 'postgres://jpypmpwb:ILYtP4boagvY6NzoOf4xeeYGGduyGhEf@babar.elephantsql.com:5432/jpypmpwb';
var sequelize = new Sequelize(url, {
    dialectOptions: { charset: 'utf8'}
});

/*
var Users = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
*/

exports.Quests = sequelize.define('Quests', {
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
    authorId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    }
});

exports.Images = sequelize.define('Images', {
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

exports.Results = sequelize.define('Results', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    questId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    imageId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    userAnswer: {
        type: Sequelize.JSON,
        allowNull: false
    }
});

Quests.sync({force: true})
    .then(function () {
        console.log('Create Quests')
    })
    .catch(function (err) {
        console.log('dont create Quests')
    });


Results.sync({force: true})
    .then(function () {
        console.log('Create Results')
    })
    .catch(function (err) {
        console.log('dont create Results');
        console.log(err);
    });

Images.sync({force: true})
    .then(function () {
        console.log('Create Images');
    })
    .catch(function (err) {
        console.log('dont create Images');
        console.log(err);
    });