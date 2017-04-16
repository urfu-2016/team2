'use strict';

const Quest = require('../models/quest');
const Comment = require('../models/comment');
const pages = require('./pages.js');

const notNumberPattern = /\D+/g;
const fs = require('fs');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));

const forbiddenSearch = /[^\w\dА-Яа-яЁё-]+/g;
const underline = /_/g;

/**
 * Страница добавления квеста
 * @param req
 * @param res
 */
exports.createQuest = (req, res) => {
    res.render('../views/quests/create.hbs');
};

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
    Quest.all().then(quests => {
        res.render('../views/quests/quests-list.hbs', {quests});
    });
};

/**
 * Получить квест по id
 * @param req
 * @param res
 */
exports.get = (req, res) => {
    if (req.params.id.match(notNumberPattern)) {
        pages.error404(req, res);
    } else {
        Promise.all([
            Quest.findById(req.params.id),
            getQuestComments(req.params.id)

        ]).then(([quest, comments]) => {
            if (quest) {
                res.render('../views/quest/get-quest.hbs', Object.assign({
                        questComments: comments.map(comment => comment.get())},
                    quest.get()
                ));
            } else {
                pages.error404(req, res);
            }
        });
    }
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

/**
 * Получает квесты текущего пользователя
 * @param req
 * @param res
 */
exports.usersQuests = (req, res) => { // eslint-disable-line no-unused-vars
    // Рендерит ../views/quests/quests-list.hbs после соответствующей выборки
};

/**
 * Поиск по названию квеста
 * @param req
 * @param res
 */
exports.search = (req, res) => {
    const pattern = req.params.pattern.replace(forbiddenSearch, '');
    Quest.all({
        where: {
            name: {
                $iLike: '%' + pattern + '%'
            }
        }
    }).then(quests => {
        res.render('../views/quests/search.hbs', {
            quests: quests.map(quest => quest.get()),
            pattern: pattern.replace(underline, ' ')
        });
    });
};

/**
 * Изменение квеста
 * @param req
 * @param res
 */
exports.update = (req, res) => { // eslint-disable-line no-unused-vars
    /* const questId = req.params.questId;
    const quest = Quest.find(questId); */
};

/**
 * Удаление квеста
 * @param req
 * @param res
 */
exports.delete = (req, res) => { // eslint-disable-line no-unused-vars
    /* const questId = req.params.questId;
    const quest = Quest.find(questId); */
};

/**
 * Увеличение числа лайков у заданного квеста
 * @param req
 * @param res
 */
exports.like = (req, res) => { // eslint-disable-line no-unused-vars

};

/**
 * Уменьшение числа лайков у заданного квеста
 * @param req
 * @param res
 */
exports.unlike = (req, res) => { // eslint-disable-line no-unused-vars

};
