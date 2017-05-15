'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: () => {
            return [
                require('cssnano'),
                require('autoprefixer')
            ];
        }
    }
};

module.exports = {
    context: path.join(__dirname, '/app/views'),
    entry: {
        siteInfrastructure: [
            './blocks/header/header.pack',
            './blocks/header/menu/menu.pack',
            './blocks/header/login/login.pack',
            './blocks/header/logo/logo.pack',
            './blocks/footer/footer.pack',
            './_layout.pack'
        ],
        about: './about/about.pack',
        error: './error/error.pack',
        signIn: './account/signIn/signIn.pack.js',
        statistics: './statistics/statistics.pack',
        management: './account/management/management.pack.js',
        create: './quests/create/create.pack',
        registration: './account/registration/registration.pack.js',
        forgotPassword: './account/forgotPassword/forgotPassword.pack.js',
        getQuest: [
            './quest/get-quest.pack.js',
            './blocks/quest-info/quest-info.pack.js',
            './blocks/likes/likes.pack',
            './blocks/finished/finished.pack',
            './comments/comment/comment.pack',
            './blocks/quest-info/geolocation'
        ],
        main: [
            './pages/main/main.pack',
            './blocks/mainContent/mainContent.pack',
            './blocks/mainContent/name/name.pack',
            './blocks/advantages/advantages.pack',
            './blocks/steps/steps.pack'
        ],
        questsList: [
            './quests/quests-list/quests-list.pack',
            './blocks/sortAndSearch/sortAndSearch.pack',
            './blocks/search/__input/search__input.pack',
            './blocks/search/__icon-loupe/search__icon-loupe.pack',
            './blocks/search/search.pack',
            './blocks/sort/sort.pack',
            './blocks/sort/sort-bar/sort-bar.pack',
            './blocks/sort/sort-bar/__sort-choice/sort-bar__sort-choice.pack',
            './blocks/sort/sort-bar/__icon-triangle/sort-bar__icon-triangle.pack',
            './blocks/sort/sort-list/sort-list.pack',
            './blocks/sort/sort-list/__option/sort-list__option.pack',
            './blocks/quests-set/quests-set.pack',
            './blocks/quests-set/quest/quest.pack',
            './blocks/quests-set/quest/__name/quest__name.pack',
            './blocks/quests-set/quest/__photo/quest__photo.pack',
            './blocks/quests-set/quest/__stats/quest__stats.pack',
            './blocks/places/places.pack.js'
        ],
        sortJS: './blocks/sort/sort',
        update: './quests/update/update.pack'
    },
    output: {
        path: path.join(__dirname, '/app/public'),
        filename: '[name].bundle.js',
        library: '[name]'
    },

    watch: NODE_ENV === 'development',
    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'cheap-module-source-map',

    module: {
        rules: [
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', postcssLoader, 'stylus-loader']
                })
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin({
            filename: '[name].bundle.css'
        }),
        new WebpackShellPlugin({
            onBuildExit: ['npm run deploy:surge']
        })
    ]
};
