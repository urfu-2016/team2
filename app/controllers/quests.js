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
                        date: formatDate(comment.updatedAt),
                        viewTools: isAuthenticated && authors[idx].username === req.user.username,
                        currentQuestId: req.params.id
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

/**
 * Прохождение квеста
 * @param req
 * @param res
 */
exports.checkCoords = (req, res) => {
    if (req.isAuthenticated()) {
        Image.findAll({
            where: {
                questId: req.params.id,
                order: req.body.order
            }
        }).then(images => {
            if (images.length !== 1) {
                res.send(500, 'У разработчика кривые руки:(');
                return;
            }

            const image = images[0];
            const isAnswerCorrect = checkRadius(image.answer, req.body.coords);
            const newResult = {
                userAnswer: req.body.coords,
                questId: parseInt(req.params.id, 10),
                isAnswerCorrect,
                imageId: parseInt(req.body.imageId, 10),
                userId: req.user.id
            };

            Result.findOrCreate({where: {
                userId: newResult.userId,
                imageId: newResult.imageId
            },
            defaults: newResult}).spread((result, isCreated) => {
                if (!isCreated && result.isAnswerCorrect) {
                    result.update(newResult).catch(err => {
                        console.error(err);
                    });
                }
            }).catch(err => {
                console.error(err);
            });

            if (isAnswerCorrect) {
                res.send(200, 'Правильное местоположение!');
            } else {
                res.send(400, 'Неправильное местоположение:(');
            }
        });
    } else {
        res.send(401, 'Сначала авторизуйтесь!');
    }
};

function checkRadius(expected, actual) {
    return getDistanceFromLatLonInKm(
            expected.latitude,
            expected.longitude,
            actual.latitude,
            actual.longitude
        ) <= 0.2;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
        (Math.sin(dLat / 2) * Math.sin(dLat / 2)) +
        (Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2))
    ;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

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
                    if (deletedCount === 1) {
                        res.redirect('/quests');
                    } else {
                        res.render('../views/error/error.hbs', {
                            title: 'Ошибка',
                            errorMessage: 'Ошибка удаления квеста'
                        });
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
