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
    let today = new Date();
    today = new Date(
        today.getYear(),
        today.getMonth(),
        today.getDay());
    Review.count({
        where: {
            isVisit: true
        }
    }).then(visits => {
        Review.count({
            where: {
                isVisit: true,
                dateTime: {
                    $gte: today
                }
            }
        }).then(visitsToday => {
            Review.count()
                .then(reviews => {
                    Review.count({
                        where: {
                            dateTime: {
                                $gte: today
                            }
                        }
                    }).then(reviewsToday => {
                        res.render('../views/statistics/get.hbs', {
                            visits,
                            visitsToday,
                            reviews,
                            reviewsToday
                        });
                    });
                });
        });
    });
};
