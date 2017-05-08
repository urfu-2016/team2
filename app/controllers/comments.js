'use strict';

const Comment = require('../models/comment');

/**
 * Страница формы создания комментария
 * @param req
 * @param res
 */
exports.createPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/comments/create.hbs', {
            questId: req.params.id
        });
    } else {
        res.render('../views/comments/notAuthorized.hbs');
    }
};

/**
 * Добавление нового комментария
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    if (req.isAuthenticated()) {
        Comment.create({
            questId: req.params.id,
            title: req.body.title,
            text: req.body.text,
            userId: req.user.id
        }).then(() => {
            res.redirect('/quests/' + req.params.id);
        }).catch(err => {
            console.error(err);
            res.render('../views/comments/error.hbs');
        });
    } else {
        res.render('../views/comments/notAuthorized.hbs');
    }
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
