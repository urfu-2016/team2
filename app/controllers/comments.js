'use strict';

const Comment = require('../models/comment');
const formatDate = require('../../scripts/dateFormatter');

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
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут создавать комментарии',
            signInFor: 'оставить комментарий'
        });
    }
};

/**
 * Добавление нового комментария
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    if (req.isAuthenticated()) {
        if (req.body.title.length === 0 || req.body.text.length === 0) {
            res.send(400, 'Пустые поля недопустимы');
        } else {
            Comment.create({
                questId: req.params.id,
                title: req.body.title,
                text: req.body.text,
                userId: req.user.id
            }).then(comment => res.status(200).json({
                title: req.body.title,
                text: req.body.text,
                author: req.user.username,
                date: formatDate(comment.updatedAt)
            })).catch(err => {
                console.error(err);
                res.render('../views/error/error.hbs', {
                    title: 'Ошибка',
                    errorMessage: 'Ошибка добавления комментария'
                });
            });
        }
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут создавать комментарии',
            signInFor: 'оставить комментарий'
        });
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
                res.render('../views/error/error.hbs', {
                    title: 'Недостаточно прав',
                    errorMessage: 'Вы не можете редактировать чужой комментарий'
                });
            }
        });
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут редактировать комментарии',
            signInFor: 'отредактировать комментарий'
        });
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
                res.redirect('/quests/' + req.params.questId);
            } else {
                res.render('../views/error/error.hbs', {
                    title: 'Недостаточно прав',
                    errorMessage: 'Вы не можете редактировать чужой комментарий'
                });
            }
        }).catch(err => {
            console.error(err);
            res.render('../views/error/error.hbs', {
                title: 'Ошибка',
                errorMessage: 'Ошибка добавления комментария'
            });
        });
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут редактировать комментарии',
            signInFor: 'отредактировать комментарий'
        });
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
                    if (deletedCount === 1) {
                        res.redirect('/quests/' + req.params.questId);
                    } else {
                        res.render('../views/error/error.hbs', {
                            title: 'Ошибка',
                            errorMessage: 'Ошибка удаления комментария'
                        });
                    }
                });
            } else {
                res.render('../views/error/error.hbs', {
                    title: 'Недостаточно прав',
                    errorMessage: 'Вы не можете удалить чужой комментарий'
                });
            }
        });
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут удалять свои комментарии',
            signInFor: 'удалить комментарий'
        });
    }
};
