'use strict';

const fs = require('fs');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;

const Image = require('../models/image');
const upload = require('../../fileUploader.js');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));

exports.create = (req, res) => {
    const file = req.files.image;
    if (!file) {
        res.send('file doesnt exists');
        return;
    }

    upload(file.data, (err, ans) => {
        if (err) {
            res.send('error: ' + JSON.stringify(err));
            return;
        }
        const image = {
            path: ans,
            answer: {
                latitude: 3.123123123,
                longitude: 2.121212
            },
            questId: parseInt(req.params.id, 10)
        };
        Image.create(image);
        res.send('created in db: ' + JSON.stringify(image));
    });
};

exports.createPage = (req, res) => {
    res.render('../views/images/create.hbs', {questId: req.params.id});
};

exports.update = (req, res) => { // eslint-disable-line no-unused-vars

};

exports.delete = (req, res) => { // eslint-disable-line no-unused-vars

};
