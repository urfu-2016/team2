'use strict';

const nodemailer = require('nodemailer');

const client = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'awesomequests2017@gmail.com',
        pass: 'somePassword' // сменить пароль, чтоб мохов перед приемом задачи не нашел тут и не поменял
    }
});

const from = '"Awesome quests" <awesomequests2017@gmail.com>';

exports.sendMail = (to, subject, html) => {
    const mailOptions = {
        from,
        to,
        subject,
        html
    };
    client.sendMail(mailOptions, err => {
        if (err) {
            console.error(err);
        }
    });
};

exports.sendToken = (to, url) => {
    exports.sendMail(to, 'Сброс пароля', 'Привет! <br>Вот твоя ссылка для сброса пароля на сайте Awesome Quests: <br> <a href="' + url + '">Кликни сюда<a>');
};

exports.sendNewPassword = (to, login, password) => {
    exports.sendMail(to, 'Новый пароль', 'Твой логин: ' + login + ' <br>Вот новый пароль: ' + password);
};
