'use strict';

const fs = require('fs');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;

const db = require('../db');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));

exports.getList = (req, res) => {
    console.log(db.sequelize.models);
    const databases = Object.keys(db.sequelize.models).map(key => {
        return {name: key};
    });
    res.render('../views/databases/list.hbs', {databases});
};

exports.getDatabase = (req, res) => {
    const modelName = req.params.name;
    const database = require(`../models/${modelName.toLowerCase()}`);
    Promise
        .all([
            database.describe(),
            database.all()
        ])
        .then(([columns, rows]) => {
            const columnsNames = Object.keys(columns);
            const stringRows = rows.map(row => {
                return row.get();
            });
            res.render('../views/databases/get.hbs', {
                name: modelName,
                columns: columnsNames,
                rows: stringRows
            });
        });
};
