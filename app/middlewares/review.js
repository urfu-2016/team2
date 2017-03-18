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
    earlierDate.setMinutes(dateTime.getMinutes() - 30);
    const previousReview = Review.find({
        where: {
            ipAddress: req.ip,
            dateTime: {
                $gt: earlierDate
            }
        }
    });
    Review.create({
        dateTime: dateTime,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        isVisit: !previousReview
    });
    next();
};
