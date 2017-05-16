'use strict';

const Image = require('../models/image');
const Quest = require('../models/quest');
const Comment = require('../models/comment');
const Like = require('../models/like');
const User = require('../models/user');
const Result = require('../models/result');
const pages = require('./pages.js');

const notNumberPattern = /\D+/g;
const forbiddenSearch = /[^\w\dА-Яа-яЁё-]+/g;
const upload = require('../../scripts/fileUploader.js');
const formatDate = require('../../scripts/dateFormatter');

/**
 * Страница добавления квеста
 * @param req
 * @param res
 */
exports.createQuest = (req, res) => {
    if (req.isAuthenticated()) {
        res.render('../views/quests/create/create.hbs');
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут создавать квесты',
            signInFor: 'создать квест'
        });
    }
};

/**
 * Добавление нового квеста
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    Quest.create({
        name: req.body.name,
        description: req.body.description,
        authorId: req.user.id
    }).then(quest => {
        uploadImage(req, quest.id);
    })
        .then(() => {
            res.redirect(302, '/quests');
        }).catch(err => {
        console.error(err);
        res.redirect('/');
    });
};

/**
 * Получает список квестов
 * @param req
 * @param res
 */
exports.list = async (req, res) => {
    const quests = await Quest.all({include: [Image]});
    getRenderOfQuestsList(res)(quests);
};

function getRenderOfQuestsList(res) {
    return async quests => {
        quests = await Promise.all(quests.map(async quest => {
            if (quest.Images.length !== 0) {
                const i = Math.floor(Math.random() * quest.Images.length);
                quest.imgSrc = quest.Images[i].path;
            }

            quest.likesCount = await Like.count({where: {questId: quest.id}});
            quest.finishedCount = (await getQuestFinishedCount(quest.id)).length;

            return quest;
        }));

        res.render('../views/quests/quests-list/list.hbs', {quests});
    };
}

/**
 * Получить квест по id
 * @param req
 * @param res
 */
exports.get = (req, res) => {
    if (req.params.id.match(notNumberPattern)) {
        pages.error404(req, res);

        return;
    }

    const isAuthenticated = req.isAuthenticated();

    Promise.all([
        Quest.findById(req.params.id),
        getQuestComments(req.params.id),
        getQuestImages(req.params.id),
        Like.findAll({
            where: {questId: req.params.id}
        }),
        getQuestFinishedCount(req.params.id),
        Quest.findById(req.params.id)
            .then(res => User.findById(res.authorId))
    ]).then(([quest, comments, images, likes, finishedCount, questAuthor]) => {
        if (!quest) {
            pages.error404(req, res);

            return;
        }
        Promise.all(comments.map(comment => User.findById(comment.userId))).then(authors => {
            res.render('../views/quest/get-quest.hbs', Object.assign({
                    questComments: comments.map((comment, idx) => Object.assign({
                        author: authors[idx].username,
                        date: formatDate(comment.updatedAt)
                    }, comment.get()))
                },
                {
                    avatar: images.length === 0 ? null : images[0].path,
                    imgSrc: images.map(image => image.path),
                    images,
                    questAuthor,
                    questId: req.params.id,
                    likesCount: likes.length,
                    finished: finishedCount.length,
                    isLiked: isAuthenticated && likes.filter(l => l.userId === req.user.id).length > 0
                },
                quest.get()
            ));
        });
    });
};

/**
 * Получает комментарии для переданного квеста
 * @param questId
 * @returns {*}
 */
function getQuestComments(questId) {
    return Comment.all({
        where: {questId}
    });
}

function getQuestImages(questId) {
    return Image.findAll({
        where: {questId}
    });
}

function getQuestFinishedCount(questId) {
    return Result.count({
            where: {questId},
        group: ['userId']
    });
}

async function getQuestsWhere(req, res, condition) {
    const quests = await Quest.findAll({
        where: condition,
        include: [Image]
    });
    getRenderOfQuestsList(res)(quests);
}

/**
 * Получает квесты текущего пользователя
 * @param req
 * @param res
 */
exports.usersQuests = (req, res) => {
    if (req.isAuthenticated()) {
        getQuestsWhere(req, res, {authorId: req.user.id});
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут просматривать список своих квестов',
            signInFor: 'увидеть список своих квестов'
        });
    }
};

/**
 * Поиск по названию квеста
 * @param req
 * @param res
 */
exports.search = (req, res) => {
    const pattern = req.query.pattern.replace(forbiddenSearch, '');
    getQuestsWhere(req, res, {
        name: {
            $iLike: '%' + pattern + '%'
        }
    });
};

function handlerUpload(coords, id, i) {
    return (err, ans) => {
        if (err) {
            console.error(err);
            return;
        }
        const image = {
            path: ans,
            answer: {
                latitude: coords[0],
                longitude: coords[1]
            },
            questId: id,
            order: i
        };
        Image.create(image);
    };
}

function uploadImage(req, id) {
    let i = 1;
    let data = req.body['inputImage' + i];
    while (data !== undefined) {
        const coords = req.body['inputCoords' + i].split(',');
        upload(data, handlerUpload(coords, id, i));
        i++;
        data = req.body['inputImage' + i];
    }
}

/**
 * Изменение квеста
 * @param req
 * @param res
 */
exports.update = (req, res) => {
    Promise.all([
        Image.destroy({
            where: {questId: req.params.id}
        }).then(() => {
            uploadImage(req, req.params.id);
        }),
    Quest.findById(req.params.id).then(quest => {
        quest.set('name', req.body.name);
        quest.set('description', req.body.description);
        quest.save();
        res.redirect(`/quests/${quest.id}`);
    })]);
};

exports.getEdit = (req, res) => {
    if (req.isAuthenticated()) {
        Promise.all([
            Quest.findById(req.params.id),
            Image.findAll({
                where: {
                    questId: req.params.id
                }
            })
        ]).then(([quest, images]) => {
            images.sort((firstImage, secondImage) => {
                return (firstImage.order > secondImage.order) ? 1 : -1;
            });
            if (req.user.id === quest.authorId) {
                res.render('../views/quests/update/update.hbs', {quest, images});
            } else {
                res.render('../views/error/error.hbs', {
                    title: 'Недостаточно прав',
                    errorMessage: 'Этот квест был создан другим пользователем'
                });
            }
        });
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут редактировать свои квесты',
            signInFor: 'отредактировать квест'
        });
    }
};

/**
 * Удаление квеста
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    if (req.isAuthenticated()) {
        const questId = req.params.id;
        Quest.findById(questId).then(quest => {
            if (req.user.id === quest.authorId) {
                Quest.destroy({
                    where: {
                        id: questId
                    }
                }).then(deletedCount => {
                    if (deletedCount !== 1) {
                        res.render('../views/error/error.hbs', {
                            title: 'Ошибка',
                            errorMessage: 'Ошибка удаления квеста'
                        });
                    } else {
                        res.redirect('/quests');
                    }
                });
            } else {
                res.render('../views/error/error.hbs', {
                    title: 'Недостаточно прав',
                    errorMessage: 'Этот квест был создан другим пользователем'
                });
            }
        });
    } else {
        res.render('../views/error/error.hbs', {
            title: 'Не авторизован',
            errorMessage: 'Только авторизованные пользователи могут удалять свои квесты',
            signInFor: 'удалить квест'
        });
    }
};

/**
 * Увеличение числа лайков у заданного квеста
 * @param req
 * @param res
 */
exports.like = (req, res) => {
    if (req.isAuthenticated()) {
        Like.count({
            where: {
                questId: req.params.id,
                userId: req.user.id
            }
        }).then(likesCount => {
            if (likesCount === 0) {
                Like.create({
                    questId: req.params.id,
                    userId: req.user.id
                }).then(() => {
                    res.send(200);
                }).catch(err => {
                    console.error((err));
                    res.send(500);
                });
            } else {
                res.send(400, 'Вы уже лайкали этот квест');
            }
        }).catch(err => {
            console.error((err));
            res.send(500);
        });
    } else {
        res.send(403);
    }
};

/**
 * Уменьшение числа лайков у заданного квеста
 * @param req
 * @param res
 */
exports.unlike = (req, res) => {
    if (req.isAuthenticated()) {
        Like.count({
            where: {
                questId: req.params.id,
                userId: req.user.id
            }
        }).then(likesCount => {
            if (likesCount > 0) {
                Like.destroy({
                    where: {
                        questId: req.params.id,
                        userId: req.user.id
                    },
                    limit: 1
                }).then(deletedCount => {
                    if (deletedCount === 1) {
                        res.send(200);
                    } else {
                        res.send(403);
                    }
                }).catch(err => {
                    console.error((err));
                    res.send(500);
                });
            } else {
                res.send(400, 'Вы ещё не лайкали этот квест');
            }
        }).catch(err => {
            console.error((err));
            res.send(500);
        });
    } else {
        res.send(403);
    }
};
