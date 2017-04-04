'use strict';

/**
 * Middleware для записи просмотров в базу данных
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
