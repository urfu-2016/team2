'use strict';

const pages = require('./controllers/pages');
const quests = require('./controllers/quests');
const comments = require('./controllers/comments');
const images = require('./controllers/images');
const account = require('./controllers/account');
const statistics = require('./controllers/statistics');
const databases = require('./controllers/databases');
const isAuth = require('./middlewares/auth');

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
        .route('/quests/search')
        .get(quests.search);

    app
        .route('/quests/:id(\\d+)')
        .get(quests.get)
        .delete(quests.delete);

    app.route('/quests/:id(\\d+)/edit')
        .get(quests.getEdit)
        .post(quests.update);

    app
        .route('/quests/:id(\\d+)/comment')
        .get(comments.createPage)
        .post(comments.create);

    app
        .route('/quests/:questId(\\d+)/comments/:id(\\d+)')
        .get(comments.updatePage)
        .post(comments.update)
        .delete(comments.delete);

    app
        .route('/quests/:id(\\d+)/like')
        .get(quests.like);

    app
        .route('/quests/:id(\\d+)/unlike')
        .get(quests.unlike);

    app
        .route('/quests/:id(\\d+)/images')
        .post(images.create)
        .get(images.createPage);

    app
        .route('/quests/:id(\\d+)/delete')
        .post(quests.delete);

    app
        .route('/quests/:questId(\\d+)/images/:id(\\d+)')
        .put(images.update)
        .delete(images.delete);

    app
        .route('/myQuests')
        .get(quests.usersQuests);

    app
        .route('/about')
        .get(pages.about);

    app
        .route('/login')
        .get(account.signIn)
        .post(account.authorize);

    app
        .route('/logout')
        .get(account.logOut);

    app
        .route('/registration')
        .get(account.registration)
        .post(account.register);

    app.use('/manage', isAuth);

    app
        .route('/manage')
        .get(account.management)
        .post(account.user);

    app
        .route('/forgotPassword')
        .get(account.forgotPassword);

    app
        .route('/requestToken')
        .post(account.requestToken);

    app
        .route('/resetPassword')
        .get(account.resetPassword);

    app
        .route('/statistics')
        .get(statistics.getStatistics);

    app
        .route('/databases')
        .get(databases.getList);

    app
        .route('/databases/:name')
        .get(databases.getDatabase);

    app.all('*', pages.error404);
};
