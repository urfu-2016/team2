'use strict';

const path = require('path');

/**
 * Страницы не существует
 * @param req
 * @param res
 */
exports.error404 = (req, res) => {
    res
        .status(404)
        .sendFile(path.join(__dirname, '../views/pages/notExists.html'));
};

/**
 * Возвращает главную страницу
 * @param req
 * @param res
 */
exports.main = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/pages/main.html'));
};
