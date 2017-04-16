'use strict';

const Review = require('../models/review');

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
        res.render('../views/statistics/get.hbs', {
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
