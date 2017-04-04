'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

function validatePassword(user, password) {
     return user.password === password;
}

passport.use('local', new LocalStrategy(
    (username, password, done) => {
        User.findOne({
            where: {username}
        })
        .catch(err => done(err))
        .then(user => {
            if (!user) {
                return done(null, false, {message: 'Неверное имя пользователя'});
            }
            if (!validatePassword(user, password)) {
                return done(null, false, {message: 'Неверный пароль'});
            }

            return done(null, user);
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .catch(done)
    .then(user => done(null, user));
});

module.exports = passport;
