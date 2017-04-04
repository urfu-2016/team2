'use strict';

const Review = require('../models/review');

/**
 * Middleware для записи просмотров в базу данных
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    console.log('status: ' + req.isAuthenticated())
    if (req.isAuthenticated()) {
        next()
    }
    else {
        req.session.loginError = 'Для доступа на эту страницу необходимо залогиниться';
        res.redirect('/login');
    }
};
