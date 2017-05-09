'use strict';

const Comment = require('../app/models/comment');
const Image = require('../app/models/image');
const Like = require('../app/models/like');
const Quest = require('../app/models/quest');
const Result = require('../app/models/result');
const Review = require('../app/models/review');
const User = require('../app/models/user');
const bcrypt = require('bcrypt');

Comment.sync({force: true})
    .then(() => {
        console.log('Create Comment');
        Comment.create({
            title: 'Замечательный квест',
            text: 'Какой замечательный квест!',
            questId: 1,
            userId: 0
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log('cant create Comment');
        console.log(err);
    });

Like.sync({force: true})
    .then(() => {
        console.log('Create Like');
        Like.create({
            questId: 0,
            userId: 0
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log('cant create Like');
        console.log(err);
    });

Review.sync({force: true})
    .then(() => {
        console.log('Create Review');
        Review.create({
            dateTime: new Date(),
            ipAddress: '::1',
            userAgent: 'initial user-agent',
            isVisit: true
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log('cant create Review');
        console.log(err);
    });

User.sync({force: true})
    .then(() => {
        console.log('Create User');
        const salt = bcrypt.genSaltSync();
        User.create({
            username: 'Alice',
            password: bcrypt.hashSync('somePass', salt),
            salt,
            email: 'fokychuk47@ya.ru'
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log('cant create User');
        console.log(err);
    });

Quest.sync({force: true})
    .then(() => {
        console.log('Create Quests');
        Quest.create({
            name: 'Вечерняя прогулка',
            authorId: 1,
            description: 'Квест о вечерней прогулке в центре города'
        }).catch(err => {
                console.log(err);
            }
        );
    })
    .catch(err => {
        console.log('cant create Quests');
        console.log(err);
    });

Result.sync({force: true})
    .then(() => {
        console.log('Create Results');
        Result.create({
            userId: 0,
            questId: 0,
            imageId: 0,
            userAnswer: {
                latitude: 123123.12,
                longitude: 1212.12
            }
        }).catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log('cant create Results');
        console.log(err);
    });

Image.sync({force: true})
    .then(() => {
        console.log('Create Images');
        Image.create({
            path: 'http://res.cloudinary.com/photoquestteam2/image/upload/v1489312400/sjwmqil61rxdyqx4skhf.png',
            answer: {
                latitude: 123123.123123123,
                longitude: 1212.121212
            },
            questId: 0
        }).catch(err => {
            console.log(err);
        });
    })
    .catch(err => {
        console.log('cant create Images');
        console.log(err);
    });
