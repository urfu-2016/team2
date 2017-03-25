'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname + "/app/views",
    entry: {
        example1: "./example1/home",
        example2: "./example2/home",
    },
    output: {
        path: __dirname + "/app/views/public",
        filename: "[name].bundle.js",
        library: '[name]'
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        })
    ]
};
