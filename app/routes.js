'use strict';

const pages = require('./controllers/pages');
const quests = require('./controllers/quests');
const comments = require('./controllers/comments');
const images = require('./controllers/images');
const account = require('./controllers/account');
const statistics = require('./controllers/statistics');

/**
 * Описание маршрутов приложения
 * @param app
 */
module.exports = function (app) {
    app.get('/', pages.main);

    app
        .route('/quests')
        .get(quests.list);

    app
        .route('/quests/createQuest')
        .get(quests.createQuest)
        .post(quests.create);

    app
        .route('/quests/:id')
        .get(quests.get)
        .put(quests.update)
        .delete(quests.delete);

    app
        .route('/quests/:id/comment')
        .get(comments.createPage)
        .post(comments.create);

    app
        .route('/quests/:questId/comments/:id')
        .put(comments.update)
        .delete(comments.delete);

    app
        .route('/quests/:id/like')
        .post(quests.like)
        .delete(quests.unlike);

    app
        .route('/quests/:id/images')
        .post(images.create)
        .get(images.createPage);

    app
        .route('/quests/:questId/images/:id')
        .put(images.update)
        .delete(images.delete);

    app
        .route('/quests/search/:pattern')
        .get(quests.search);

    app
        .route('/quests/myQuests')
        .get(quests.usersQuests);

    app
        .route('/login')
        .get(account.signIn)
        .post(account.authorize);

    app
        .route('/registration')
        .get(account.registration)
        .post(account.register);

    app
        .route('/users/:id')
        .get(account.management)
        .put(account.user);

    app
        .route('/statistics')
        .get(statistics.getStatistics);

    app.all('*', pages.error404);
};
