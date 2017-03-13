'use strict';

const Quest = require('../models/quest');

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

exports.list = (req, res) => {
    Quest.findAll()
        .then(quests => {
            res.render('../views/quests/list.hbs', {quests: quests});
        });
};

exports.get = (req, res) => {
    /* eslint no-unused-vars: 0 */
    /* const questId = req.params.questId;
    const quest = Quest.find(questId);
    const data = Object.assign({quest: quest}, res.locals);

    if (quest) {
        res.render('quest', data);
    } else {
        res.sendStatus(404);
    } */
};

exports.update = (req, res) => {
    /* eslint no-unused-vars: 0 */
    /* const questId = req.params.questId;
    const quest = Quest.find(questId); */
};

exports.delete = (req, res) => {
    /* eslint no-unused-vars: 0 */
    /* const questId = req.params.questId;
    const quest = Quest.find(questId); */
};

exports.like = (req, res) => {
    /* eslint no-unused-vars: 0 */
};

exports.unlike = (req, res) => {
    /* eslint no-unused-vars: 0 */
};
