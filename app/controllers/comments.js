'use strict';

const Comment = require('../models/comment');

/**
 * DEPRECATED
 */
exports.createPage = (req, res) => { // eslint-disable-line no-unused-vars
    res.render('../views/comments/create.hbs');
};

/**
 * Добавление нового комментария
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    Comment.create({
        questId: req.params.questId,
        text: req.body.text,
        userId: req.user.id
    }).then(() => {
        res.redirect(302, '/quests/' + req.body.questId);
    }).catch(err => {
        console.error(err);
        res.redirect('/quests/' + req.body.questId);
    });
};

/**
 * Редактирование комментария
 * @param req
 * @param res
 */
exports.update = (req, res) => {
    Comment.findById(req.params.id).then(comment => {
        comment.set('title', req.body.title);
        comment.save();
        res.redirect(`/quests/${req.params.questId}`);
    });
};

/**
 * Удаление комментария
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    if (req.isAuthenticated()) {
        const commentId = req.params.id;
        Comment.findById(commentId).then(comment => {
            if (req.user.id === comment.userId) {
                Comment.destroy({
                    where: {
                        id: commentId
                    }
                }).then(deletedCount => {
                    if (deletedCount !== 1) {
                        res.render('../views/pages/forbidden/forbidden.hbs');
                    }
                });
            } else {
                res.render('../views/pages/forbidden/forbidden.hbs');
            }
        });
    } else {
        res.render('../views/pages/forbidden/forbidden.hbs');
    }
};
