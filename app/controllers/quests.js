'use strict';

const Quest = require('../models/quest');
const numberPattern = /\d+/g;
const forbiddenSearch = /[^\w\dА-Яа-яЁё-]+/g;
const underline = /_/g;

/**
 * Добавление нового квеста
 * @param req
 * @param res
 */
exports.create = (req, res) => {
    /* eslint no-unused-vars: 0 */
    /* const quest = new Quest({
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        questId: req.body.questId
    });

    quest.save();

    // Не позволяем отправлять форму дважды
    res.redirect(302, '/quests'); */
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
    if (numberPattern.test(req.params.id)) {
        Quest.findById(req.params.id)
            .then(quest => {
                if (quest) {
                    res.render('../views/quests/get.hbs', quest.dataValues);
                } else {
                    res.render('../views/pages/notFound.hbs');
                }
            });
    } else {
        res.render('../views/pages/notFound.hbs');
    }
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
