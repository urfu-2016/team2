'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({
            where: {
                name: username
            }
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Неверное имя пользователя'});
            }
            if (!password) {
                return done(null, false, {message: 'Неверный пароль'});
            }

            return done(null, user);
        });
    }
));

// passport.serializeUser();
// passport.deserializeUser();
