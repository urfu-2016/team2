'use strict';

const Quest = require('../models/Quest');

// поулчить форму для реактирования
exports.management = (req, res) => {

};

// обновить инфу о пользователе
exports.user = (req, res) => {

};


exports.list = (req, res) => {
/*    const quests = Quest.findAll();
    const data = Object.assign({quests: quests}, res.locals);

    res.render('quests', data);*/
};

exports.show = (req, res) => {
/*    const name = req.params.name;
    const quest = Quest.find(name);
    const data = Object.assign({quest: quest}, res.locals);

    if (Quest) {
        res.render('quest', data);
    } else {
        res.sendStatus(404);
    }*/
};

// создание с конкертными полями id etc
exports.create = (req, res) => {
/*    const quest = new Quest({
        name: req.body.name,
        password: req.body.password,
        userId: req.body.userId
    });

    quest.save();

    // Не позволяем отправлять форму дважды
    res.redirect(302, '/quests');*/
};
