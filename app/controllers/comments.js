'use strict';

const fs = require('fs');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;
// const Quest = require('../models/Quest');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));

/**
 * Страница формы создания комментария
 * @param req
 * @param res
 */
exports.createPage = (req, res) => { // eslint-disable-line no-unused-vars
    res.render('../views/comments/create.hbs');
};

/**
 * Добавление нового комментария
 * @param req
 * @param res
 */
exports.create = (req, res) => { // eslint-disable-line no-unused-vars
    /* const comment = new Quest({
        questId: req.body.questId,
        userId: req.body.userId,
        text: req.body.text,
        commentId: req.body.commentId
    });

    comment.save();

    // Не позволяем отправлять форму дважды
    res.redirect(302, '/comments.js'); */
};

/**
 * Редактирование комментария
 * @param req
 * @param res
 */
exports.update = (req, res) => { // eslint-disable-line no-unused-vars

};

/**
 * Удаление комментария
 * @param req
 * @param res
 */
exports.delete = (req, res) => { // eslint-disable-line no-unused-vars

};
