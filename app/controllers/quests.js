'use strict';

const path = require('path');

const Quest = require('../models/quest');
const notNumberPattern = /[\D]+/g;
const forbiddenSearch = /[^\w\dА-Яа-яЁё-]+/g;
const underline = /_/g;

/**
 * Добавление нового квеста
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    Quest.create({
        name: req.body.name,
        description: req.body.description
        // authorId: получить текущего пользователя
    });
    res.redirect(302, '/quests');
};

/**
 * Получает список квестов
 * @param req
 * @param res
 */
exports.list = (req, res) => {
    Quest.findAll()
        .then(quests => {
            res.render('../views/quests/list.hbs', {quests: quests});
        });
};

/**
 * Получить квест по id
 * @param req
 * @param res
 */
exports.get = (req, res) => {
    if (req.params.id.match(notNumberPattern)) {
        res.status(404)
            .sendFile(path.join(__dirname, '../views/pages/notExists.html'));
    } else {
        Quest.findById(req.params.id).then(quest => {
            if (quest) {
                res.render('../views/quests/get.hbs', quest.dataValues);
            } else {
                res.status(404)
                    .sendFile(path.join(__dirname, '../views/pages/notExists.html'));
            }
        });
    }
};

/**
 * Получает квесты текущего пользователя
 * @param req
 * @param res
 */
exports.usersQuests = (req, res) => {
    /* eslint no-unused-vars: 0 */
    // Рендерит ../views/quests/list.hbs после соответствующей выборки
};

/**
 * Поиск по названию квеста
 * @param req
 * @param res
 */
exports.search = (req, res) => {
    const pattern = req.params.pattern.replace(forbiddenSearch, '');
    Quest.findAll({
        where: {
            name: {
                $iLike: '%' + pattern + '%'
            }
        }
    }).then(quests => {
        res.render('../views/quests/search.hbs', {
            quests: quests,
            pattern: pattern.replace(underline, ' ')
        });
    });
};

/**
 * Изменение квеста
 * @param req
 * @param res
 */
exports.update = (req, res) => {
    /* eslint no-unused-vars: 0 */
    /* const questId = req.params.questId;
    const quest = Quest.find(questId); */
};

/**
 * Удаление квеста
 * @param req
 * @param res
 */
exports.delete = (req, res) => {
    /* eslint no-unused-vars: 0 */
    /* const questId = req.params.questId;
    const quest = Quest.find(questId); */
};

/**
 * Увеличение числа лайков у заданного квеста
 * @param req
 * @param res
 */
exports.like = (req, res) => {
    /* eslint no-unused-vars: 0 */
};

/**
 * Уменьшение числа лайков у заданного квеста
 * @param req
 * @param res
 */
exports.unlike = (req, res) => {
    /* eslint no-unused-vars: 0 */
};
