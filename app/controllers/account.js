'use strict';

const fs = require('fs');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));

/**
 * Получить форму авторизации
 * @param req
 * @param res
 */
exports.signIn = (req, res) => {
    res.render('../views/account/signIn.hbs');
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
exports.register = (req, res) => { // eslint-disable-line no-unused-vars
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
    res.render('../views/account/registration.hbs');
};

/**
 * Страница управления аккаунтом
 * @param req
 * @param res
 */
exports.management = (req, res) => { // eslint-disable-line no-unused-vars
    res.render('../views/account/management.hbs');
};

/**
 * Обновление информации о пользователе
 * @param req
 * @param res
 */
exports.user = (req, res) => { // eslint-disable-line no-unused-vars
    /* eslint no-unused-vars: 0 */
};
