'use strict';

const path = require('path');
// const Quest = require('../models/Quest');

/**
 * Получить форму авторизации
 * @param req
 * @param res
 */
exports.signIn = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/account/signIn.html'));
};

/**
 * Авторизация пользователя
 * @param req
 * @param res
 */
exports.authorize = (req, res) => {
    res.redirect('/quests');
};

/**
 * Добавить нового пользователя
 * @param req
 * @param res
 */
exports.register = (req, res) => {
    /* const user = new Quest({
        name: req.body.name,
        password: req.body.password,
        userId: req.body.userId
    });

    user.save();

    // Не позволяем отправлять форму дважды
    res.redirect(302, '/registration'); */
};

/**
 * Получить форму регистрации
 * @param req
 * @param res
 */
exports.registration = (req, res) => { // eslint-disable-line no-unused-vars

};

/**
 * Страница управления аккаунтом
 * @param req
 * @param res
 */
exports.management = (req, res) => { // eslint-disable-line no-unused-vars

};

/**
 * Обновление информации о пользователе
 * @param req
 * @param res
 */
exports.user = (req, res) => { // eslint-disable-line no-unused-vars

};
