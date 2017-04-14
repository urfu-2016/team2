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

handlebars.registerPartial('search', fs.readFileSync('app/views/blocks/search/search.hbs', 'utf-8'));
handlebars.registerPartial('search__input', fs.readFileSync('app/views/blocks/search/__input/search__input.html', 'utf-8'));
handlebars.registerPartial('search__icon-loupe', fs.readFileSync('app/views/blocks/search/__icon-loupe/search__icon-loupe.html', 'utf-8'));

handlebars.registerPartial('quests-set', fs.readFileSync('app/views/blocks/quests-set/quests-set.hbs', 'utf-8'));
handlebars.registerPartial('quest', fs.readFileSync('app/views/blocks/quests-set/quest/quest.hbs', 'utf-8'));
handlebars.registerPartial('quest__bar-new', fs.readFileSync('app/views/blocks/quests-set/quest/__bar-new/quest__bar-new.html', 'utf-8'));
handlebars.registerPartial('quest__name', fs.readFileSync('app/views/blocks/quests-set/quest/__name/quest__name.html', 'utf-8'));
handlebars.registerPartial('quest__photo', fs.readFileSync('app/views/blocks/quests-set/quest/__photo/quest__photo.html', 'utf-8'));
handlebars.registerPartial('quest__stats', fs.readFileSync('app/views/blocks/quests-set/quest/__stats/quest__stats.html', 'utf-8'));

handlebars.registerPartial('sortAndSearch', fs.readFileSync('app/views/blocks/sortAndSearch/sortAndSearch.hbs', 'utf-8'));
handlebars.registerPartial('sort', fs.readFileSync('app/views/blocks/sort/sort.hbs', 'utf-8'));
handlebars.registerPartial('sort-bar', fs.readFileSync('app/views/blocks/sort/sort-bar/sort-bar.hbs', 'utf-8'));
handlebars.registerPartial('sort-bar__icon-triangle', fs.readFileSync('app/views/blocks/sort/sort-bar/__icon-triangle/sort-bar__icon-triangle.html', 'utf-8'));
handlebars.registerPartial('sort-bar__sort-choice', fs.readFileSync('app/views/blocks/sort/sort-bar/__sort-choice/sort-bar__sort-choice.html', 'utf-8'));
handlebars.registerPartial('sort-list__option', fs.readFileSync('app/views/blocks/sort/sort-list/__option/sort-list__option.html', 'utf-8'));
handlebars.registerPartial('sort-list', fs.readFileSync('app/views/blocks/sort/sort-list/sort-list.hbs', 'utf-8'));


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

exports.questsList = (req, res) => {
    res.render('../views/pages/quests-list.hbs');
};
