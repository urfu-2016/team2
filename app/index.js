'use strict';

const path = require('path');

const bodyParser = require('body-parser');
const express = require('express');
const hbs = require('hbs');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');

const app = express();

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(morgan('dev'));
app.use(fileUpload());

if (process.env.NODE_ENV === 'local') {
    app.use(express.static(publicDir));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(require('./middlewares/review'));

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */

    console.error(err.stack);

    next();
});

require('./routes')(app);

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    /* eslint max-params: [2, 4] */

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
