'use strict';

/**
 * Страницы не существует
 * @param req
 * @param res
 */
exports.error404 = (req, res) => {
    res.status(404).send('<p>Страницы не существует</p>');
};
