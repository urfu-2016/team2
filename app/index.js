'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const favicon = require('serve-favicon');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(morgan('dev'));
app.use(fileUpload());

app.use(favicon('./favicon.ico'));
app.use(express.static(publicDir));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('./middlewares/review'));

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

require('./routes')(app);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(err.stack);

    res.sendStatus(500);
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.info(`Server started on ${port}`);

    if (process.env.NODE_ENV === 'local') {
        console.info(`Open http://localhost:${port}/ to view service`);
    }
});
