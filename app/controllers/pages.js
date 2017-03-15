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
