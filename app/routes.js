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
        .route('/quests/:id')
        .get(quests.get)
        .delete(quests.delete);

    app.route('/quests/:id/edit')
        .get(quests.getEdit)
        .post(quests.update);

    app
        .route('/quests/:id/comment')
        .get(comments.createPage)
        .post(comments.create);

    app
        .route('/quests/:questId/comments/:id')
        .get(comments.updatePage)
        .post(comments.update)
        .delete(comments.delete);

    app
        .route('/quests/:id/like')
        .get(quests.like);

    app
        .route('/quests/:id/unlike')
        .get(quests.unlike);

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
        .route('/myQuests')
        .get(quests.usersQuests);

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
        .put(account.user);

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
