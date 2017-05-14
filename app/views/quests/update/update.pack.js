'use strict';

const readImages = require('./read-images');
const fillForm = require('../create/fill-form');
const loadImage = require('../create/load-image');
require('./update.styl');
require('../create/create.styl');

exports.readImages = readImages;
exports.loadImage = loadImage;
exports.fillForm = fillForm;
