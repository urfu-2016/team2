'use strict';

const fs = require('fs');
const passport = require('../config/configPassport');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;
const User = require('../models/user');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));

/**
 * Получить форму авторизации
 * @param req
 * @param res
 */
exports.signIn = (req, res) => {
    res.render('../views/account/signIn.hbs', {errorMessage:req.session.loginError});
};

/**
 * Выход пользователя
 * @param req
 * @param res
 */
exports.logOut = (req, res) => {
    req.logout();
    res.redirect('/');
};

/**
 * Авторизация пользователя
 * @param req
 * @param res
 */
exports.authorize = function(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user)
        {
            req.session.loginError = info.message;
            return res.redirect('/login');
        }
        req.logIn(user, err => {
            err ? next(err) : res.redirect('/manage')
        });
    })(req, res, next);
};

/**
 * Добавить нового пользователя
 * @param req
 * @param res
 */
exports.register = (req, res) => { // eslint-disable-line no-unused-vars
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(user => req.logIn(user, err => {
        console.log('this is it')
        console.log(err);
        res.redirect('/');
    }))
    .catch(err => {
        console.log(err);
        req.session.registerError = err;
        res.redirect('/registration');
    });
};

/**
 * Получить форму регистрации
 * @param req
 * @param res
 */
exports.registration = (req, res) => { // eslint-disable-line no-unused-vars
    res.render('../views/account/registration.hbs', {errorMessage: req.session.registerError});
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
