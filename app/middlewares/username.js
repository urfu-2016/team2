'use strict';

/**
 * Middleware для записи имени пользователя в локальные переменные
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.username = req.user.username;
        res.locals.userAvatar = req.user.avatar;
    } else {
        res.locals.username = '';
        res.locals.userAvatar = '';
    }

    next();
};
