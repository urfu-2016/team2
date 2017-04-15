'use strict';

const fs = require('fs');
const layouts = require('handlebars-layouts');
const handlebars = require('hbs').handlebars;
const Review = require('../models/review');

handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync('app/views/_layout.hbs', 'utf-8'));

/**
 * Получает страницу со статистикой
 * @param req
 * @param res
 */
exports.getStatistics = (req, res) => {
    // Требует определённых прав.
    // Если их нет, res.sendFile(path.join(__dirname, '../views/pages/forbidden.html');
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    Promise.all([
        countTotalVisits(),
        countVisitsSinceDate(today),
        Review.count(), // всего просмотров
        countReviewsSinceDate(today)
    ]).then(([visits, visitsToday, reviews, reviewsToday]) => {
        res.render('../views/statistics/get-quest.hbs', {
            visits,
            visitsToday,
            reviews,
            reviewsToday
        });
    });
};

function countTotalVisits() {
    return Review.count({
        where: {
            isVisit: true
        }
    });
}

function countVisitsSinceDate(date) {
    return Review.count({
        where: {
            isVisit: true,
            dateTime: {
                $gte: date
            }
        }
    });
}

function countReviewsSinceDate(date) {
    return Review.count({
        where: {
            dateTime: {
                $gte: date
            }
        }
    });
}
