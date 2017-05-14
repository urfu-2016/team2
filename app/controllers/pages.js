'use strict';

/**
 * Страницы не существует
 * @param req
 * @param res
 */
exports.error404 = (req, res) => {
    res.render(404, '../views/error/error.hbs', {
        title: 'Не существует',
        errorMessage: 'Страница не существует'
    });
};

/**
 * Возвращает главную страницу
 * @param req
 * @param res
 */
exports.main = (req, res) => {
    res.render('../views/pages/main/main.hbs');
};

/**
 * Страница с описанием проекта
 * @param req
 * @param res
 */
exports.about = (req, res) => {
    res.render('../views/about/about.hbs');
};

