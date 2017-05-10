'use strict';

/**
 * Страницы не существует
 * @param req
 * @param res
 */
exports.error404 = (req, res) => {
    res.render('../views/pages/notExists/notExists.hbs');
};

/**
 * Возвращает главную страницу
 * @param req
 * @param res
 */
exports.main = (req, res) => {
    res.render('../views/pages/main/main.hbs');
};

