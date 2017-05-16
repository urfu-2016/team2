'use strict';

const Quest = require('../models/quest');
const User = require('../models/user');

/**
 * Страницы не существует
 * @param req
 * @param res
 */
exports.error404 = (req, res) => {
    res.status(404).render('../views/error/error.hbs', {
        title: 'Не существует',
        errorMessage: 'Страница не существует'
    });
};

/**
 * Возвращает главную страницу
 * @param req
 * @param res
 */
exports.main = (req, res) => {
    Promise.all([
        Quest.count(),
        User.count()
    ]).then(([questsCount, gamersCount]) => {
        res.render('../views/pages/main/main.hbs', {
            questsCount,
            gamersCount
        });
    }).catch(err => {
        console.error(err);
        res.render('../views/error/error.hbs', {
            title: 'Awesome Quests',
            errorMessage: 'Я, конечно, мало что знаю о тебе, а ты обо мне, но теперь у нас есть кое-что общее :)'
        });
    });
};

/**
 * Страница с описанием проекта
 * @param req
 * @param res
 */
exports.about = (req, res) => {
    res.render('../views/about/about.hbs');
};

