'use strict';

/*const Quest = require('../models/quest');*/

exports.create = (req, res) => {
/*    const quest = new Quest({
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        questId: req.body.questId
    });

    quest.save();

    // Не позволяем отправлять форму дважды
    res.redirect(302, '/quests');*/
};

exports.list = (req, res) => {
/*    const quests = Quest.findAll();
    const data = Object.assign({quests: quests}, res.locals);

    res.render('quests', data);*/
};

exports.get = (req, res) => {
/*    const questId = req.params.questId;
    const quest = Quest.find(questId);
    const data = Object.assign({quest: quest}, res.locals);

    if (quest) {
        res.render('quest', data);
    } else {
        res.sendStatus(404);
    }*/
};



exports.update = (req, res) => {
/*    const questId = req.params.questId;
    const quest = Quest.find(questId);*/
}

exports.delete = (req, res) => {
/*    const questId = req.params.questId;
    const quest = Quest.find(questId);*/
}


