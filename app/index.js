'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const favicon = require('serve-favicon');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(morgan('dev'));
app.use(fileUpload());

app.use(favicon('./favicon.ico'));
app.use(express.static(publicDir));

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);
    console.log('AZAZAZ')
    res.sendStatus(500);
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

require('./config/configPassport');

app.use(require('./middlewares/review'));

require('./routes')(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.info(`Server started on ${port}`);

    if (process.env.NODE_ENV === 'local') {
        console.info(`Open http://localhost:${port}/ to view service`);
    }
});
