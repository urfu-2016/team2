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
    // Если их нет, res.render('../views/pages/forbidden.hbs');
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
                            visits: visits,
                            visitsToday: visitsToday,
                            reviews: reviews,
                            reviewsToday: reviewsToday
                        });
                    });
                });
        });
    });
};
