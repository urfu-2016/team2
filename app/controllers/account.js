'use strict';

const passport = require('../config/configPassport');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const emailService = require('../services/emailService');

/**
 * Получить форму авторизации
 * @param req
 * @param res
 */
exports.signIn = (req, res) => {
    res.render('../views/account/signIn/signIn.hbs', {errorMessage: req.session.loginError});
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
exports.authorize = function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.session.loginError = info.message;
            return res.redirect('/login');
        }
        req.logIn(user, err => err ? next(err) : res.redirect('/manage'));
    })(req, res, next);
};

/**
 * Добавить нового пользователя
 * @param req
 * @param res
 */
exports.register = (req, res) => { // eslint-disable-line no-unused-vars
    const salt = bcrypt.genSaltSync();
    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, salt),
        salt,
        email: req.body.email
    })
    .then(user => req.logIn(user, err => {
            console.error(err);
            res.redirect('/');
        })
    )
    .catch(err => {
        console.error(err);
        req.session.registerError = "Ошибка регистрации";
        res.redirect('/registration');
    });
};

/**
 * Получить форму регистрации
 * @param req
 * @param res
 */
exports.registration = (req, res) => { // eslint-disable-line no-unused-vars
    res.render('../views/account/registration/registration.hbs', {errorMessage: req.session.registerError});
};

/**
 * Страница управления аккаунтом
 * @param req
 * @param res
 */
exports.management = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/account/management/management.hbs', {
            username: req.user.username,
            email: req.user.email
        });
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут редактировать свой аккаунт',
            signInFor: 'изменить личные данные'
        });
    }
};

/**
 * Обновление информации о пользователе
 * @param req
 * @param res
 */
exports.user = (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const salt = bcrypt.genSaltSync();
            req.user.set('username', req.body.username);
            req.user.set('password', bcrypt.hashSync(req.body.password, salt));
            req.user.set('salt', salt);
            req.user.set('email', req.body.email);
            req.user.save();
            res.redirect('/');
        } catch (err) {
            console.error(err);
            req.session.registerError = err;
            res.render('../views/error/error.hbs', {
                title: 'Ошибка',
                errorMessage: 'Ошибка при изменении личных данных'
            });
        }
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут редактировать свой аккаунт',
            signInFor: 'изменить личные данные'
        });
    }
};

exports.forgotPassword = (req, res) => {
    res.render('../views/account/forgotPassword.hbs');
};

exports.requestToken = (req, res) => {
    const email = req.body.email;
    User.findOne({
            where: {email}
        })
    .catch(err => res.render('../views/account/forgotPassword.hbs', {errorMessage: err}))
    .then(user => {
        if (!user) {
            res.render('../views/account/forgotPassword.hbs', {errorMessage: 'Пользователь с таким email не найден'});
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.update({
            passwordResetToken: token
        }).then(() => {
            emailService.sendToken(user.email, 'http://' + req.headers.host + '/resetPassword?token=' + token);
            res.send('Проверьте вашу электронную почту');
        });
    });
};

exports.resetPassword = (req, res) => {
    const token = req.query.token;
    User.findOne({
            where: {passwordResetToken: token}
        })
    .catch(err => res.render('../views/account/forgotPassword.hbs', {errorMessage: err}))
    .then(user => {
        if (!user) {
            res.render('../views/account/forgotPassword.hbs', {errorMessage: 'Неправильный токен'});
        }

        const newPassword = Math.random().toString(36).slice(-8);
        const newSalt = bcrypt.genSaltSync();
        user.update({
            password: bcrypt.hashSync(newPassword, newSalt),
            salt: newSalt
        })
        .then(() => {
            emailService.sendNewPassword(user.email, user.username, newPassword);
        });

        res.redirect('/login');
    });
};
