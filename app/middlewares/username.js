'use strict';

/**
 * Middleware для записи имени пользователя в локальные переменные
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    res.locals.username = req.isAuthenticated() ? req.user.username : '';
    next();
};
