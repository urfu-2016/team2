'use strict';

var Sequelize = require('sequelize');
var url = 'postgres://jpypmpwb:ILYtP4boagvY6NzoOf4xeeYGGduyGhEf@babar.elephantsql.com:5432/jpypmpwb';
exports.sequelize = new Sequelize(url, {
    dialectOptions: {charset: 'utf8'}
});
