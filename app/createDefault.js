'use strict';

var image = require('./models/image.js');
var result = require('./models/result.js');
var quest = require('./models/quest.js');

quest.sync({force: true})
    .then(function () {
        console.log('Create Quests');
        quest.create({
            name: 'Вечерняя прогулка',
            authorId: 0,
            description: 'Квест о вечерней прогулке в центре города'
        }).catch(function (err) {
                console.log(err);
            }
        );
    })
    .catch(function (err) {
        console.log('dont create Quests');
        console.log(err);
    });

result.sync({force: true})
    .then(function () {
        console.log('Create Results');
        result.create({
            userId: 0,
            questId: 0,
            imageId: 0,
            userAnswer: {
                latitude: 123123.12,
                longitude: 1212.12
            }
        }).catch(function (err) {
            console.log(err);
        });
    })
    .catch(function (err) {
        console.log('dont create Results');
        console.log(err);
    });

image.sync({force: true})
    .then(function () {
        console.log('Create Images');
        image.create({
            path: 'http://res.cloudinary.com/photoquestteam2/image/upload/v1489312400/sjwmqil61rxdyqx4skhf.png',
            answer: {
                latitude: 123123.123123123,
                longitude: 1212.121212
            }
        }).catch(function (err) {
            console.log(err);
        });
    })
    .catch(function (err) {
        console.log('dont create Images');
        console.log(err);
    });
