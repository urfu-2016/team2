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
 * Страница редиктирования комментария
 * @param req
 * @param res
 */
exports.updatePage = (req, res) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.id).then(comment => {
            if (comment.userId === req.user.id) {
                res.render('../views/comments/update.hbs', {
                    questId: req.params.questId,
                    commentId: req.params.id
                });
            } else {
                res.render('../views/pages/forbidden/forbidden.hbs');
            }
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
exports.update = (req, res) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.id).then(comment => {
            if (comment.userId === req.user.id) {
                comment.set('title', req.body.title);
                comment.set('text', req.body.text);
                comment.save();
                res.redirect('/quests/' + req.params.id);
            } else {
                res.render('../views/pages/forbidden/forbidden.hbs');
            }
        }).catch(err => {
            console.error(err);
            res.render('../views/comments/error.hbs');
        });
    } else {
        res.render('../views/comments/notAuthorized.hbs');
    }
};

/**
 * Удаление комментария
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.id).then(comment => {
            if (comment.userId === req.user.id) {
                Comment.destroy({
                    where: {
                        id: req.params.id
                    }
                }).then(deletedCount => {
                    if (deletedCount !== 1) {
                        res.render('../views/pages/forbidden/forbidden.hbs')
                    }
                });
            } else {
                res.render('../views/pages/forbidden/forbidden.hbs');
            }
        });
    } else {
        res.render('../views/comments/notAuthorized.hbs');
    }
};
