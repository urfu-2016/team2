'use strict';

const Review = require('../models/review');

/**
 * Middleware для записи просмотров в базу данных
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    const dateTime = new Date();
    const earlierDate = new Date(dateTime);
    earlierDate.setUTCMinutes(dateTime.getMinutes() - 30);
    Review.find({
        where: {
            ipAddress: req.ip,
            dateTime: {
                $gt: earlierDate
            }
        }
    }).then(review => {
        Review.create({
            dateTime,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            isVisit: !review
        });
    });

    next();
};
