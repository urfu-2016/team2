'use strict';

const pages = require('./controllers/pages');
const quests = require('./controllers/quests');
const comments = require('./controllers/comments');
const images = require('./controllers/images');
const account = require('./controllers/account');

module.exports = function (app) {
    app.get('/', quests.list);

    app
        .route('/quests')
        .get(quests.list)
        .post(quests.create);

    app
        .route('/quests/:id')
        .get(quests.get)
        .put(quests.update)
        .delete(quests.delete);

    app
        .route('/quests/:id/comments')
        .post(comments.create);

    app
        .route('/quests/:questId/comments/:id')
        .put(comments.update)
        .delete(comments.delete);

    app
        .route('/quest/:id/like')
        .post(quests.like)
        .delete(quests.unlike);

    app
        .route('/quests/:id/images')
        .post(images.create);

    app
        .route('/quests/:questId/images/:id')
        .put(images.update)
        .delete(images.delete);

    app
        .route('/registration')
        .get(account.registration)
        .post(account.register);

    app
        .route('/users/:id')
        .get(account.management)
        .put(account.user);

    app.all('*', pages.error404);
};
