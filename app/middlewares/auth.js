'use strict';

/**
 * Middleware для ограничения доступа незарегистрированным пользователям
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.session.loginError = 'Для доступа на эту страницу необходимо залогиниться';
        res.redirect('/login');
    }
};
