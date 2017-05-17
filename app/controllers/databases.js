'use strict';

const db = require('../config/db');
const pages = require('./pages.js');

exports.checkUserRights = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.id === 1) {
            next();
            return;
        }
    }
    res.render('../views/error/error.hbs', {
        title: 'Доступ запрещён',
        errorMessage: 'А не хацкер ли ты часом?'
    });
};

exports.getList = (req, res) => {
    const databases = Object.keys(db.sequelize.models).map(key => {
        return {name: key};
    });
    res.render('../views/databases/list.hbs', {databases});
};

exports.getDatabase = (req, res) => {
    const modelName = req.params.name;
    if (!db.sequelize.isDefined(modelName)) {
        pages.error404(req, res);
        return;
    }
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
