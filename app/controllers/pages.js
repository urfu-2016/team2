'use strict';

const fs = require('fs');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));
handlebars.registerPartial('header', fs.readFileSync('app/views/blocks/header/header.hbs', 'utf-8'));
handlebars.registerPartial('logo', fs.readFileSync('app/views/blocks/header/logo/logo.html', 'utf-8'));
handlebars.registerPartial('menu', fs.readFileSync('app/views/blocks/header/menu/menu.html', 'utf-8'));
handlebars.registerPartial('login', fs.readFileSync('app/views/blocks/header/login/login.html', 'utf-8'));

/**
 * Страницы не существует
 * @param req
 * @param res
 */
exports.error404 = (req, res) => {
    res.render('../views/pages/notExists.hbs');
};

/**
 * Возвращает главную страницу
 * @param req
 * @param res
 */
exports.main = (req, res) => {
    res.render('../views/pages/main.hbs', {username: req.isAuthenticated() ? req.user.username : ''});
};
