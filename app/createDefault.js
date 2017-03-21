'use strict';

const Comment = require('./models/comment');
const Image = require('./models/image');
const Like = require('./models/like');
const Quest = require('./models/quest');
const Result = require('./models/result');
const Review = require('./models/review');
const User = require('./models/user');

Comment.sync({force: true})
    .then(() => {
        console.log('Create Comment');
        Comment.create({
            title: 'Какой замечательный квест!',
            questId: 1,
            userId: 0,
            createdOn: new Date()
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log('dont create Comment');
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
        console.log('dont create Like');
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
        console.log('dont create Review');
        console.log(err);
    });

User.sync({force: true})
    .then(() => {
        console.log('Create User');
        User.create({
            name: 'Alice',
            password: 'some-hash'
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log('dont create User');
        console.log(err);
    });

Quest.sync({force: true})
    .then(() => {
        console.log('Create Quests');
        Quest.create({
            name: 'Вечерняя прогулка',
            authorId: 0,
            description: 'Квест о вечерней прогулке в центре города'
        }).catch(err => {
                console.log(err);
            }
        );
    })
    .catch(err => {
        console.log('dont create Quests');
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
        console.log('dont create Results');
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
        console.log('dont create Images');
        console.log(err);
    });
