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
        registration: './account/registration/registration.pack.js',
        getQuest: './quest/get-quest.pack.js',
        layout: './_layout.pack',
        footer: './blocks/footer/footer.pack',
        finished: './blocks/finished/finished.pack',
        forbidden: './pages/forbidden/forbidden.pack',
        header: './blocks/header/header.pack',
        likes: './blocks/likes/likes.pack',
        logo: './blocks/header/logo/logo.pack',
        login: './blocks/header/login/login.pack',
        menu: './blocks/header/menu/menu.pack',
        main: './pages/main/main.pack',
        mainContent: './blocks/mainContent/mainContent.pack',
        notExists: './pages/notExists/notExists.pack',
        search: './blocks/search/search.pack',
        searchInput: './blocks/search/__input/search__input.pack',
        searchIconLoupe: './blocks/search/__icon-loupe/search__icon-loupe.pack',
        serviceName: './blocks/mainContent/name/name.pack',
        questsSet: './blocks/quests-set/quests-set.pack',
        quest: './blocks/quests-set/quest/quest.pack',
        questInfo: './blocks/quest-info/quest-info.pack.js',
        questBarNew: './blocks/quests-set/quest/__bar-new/quest__bar-new.pack',
        questName: './blocks/quests-set/quest/__name/quest__name.pack',
        questPhoto: './blocks/quests-set/quest/__photo/quest__photo.pack',
        questStats: './blocks/quests-set/quest/__stats/quest__stats.pack',
        questsList: './quests/quests-list/quests-list.pack',
        sortBar: './blocks/sort/sort-bar/sort-bar.pack',
        sortBarIconTriangle: './blocks/sort/sort-bar/__icon-triangle/sort-bar__icon-triangle.pack',
        sortBarSortChoice: './blocks/sort/sort-bar/__sort-choice/sort-bar__sort-choice.pack',
        sortList: './blocks/sort/sort-list/sort-list.pack',
        sortListOption: './blocks/sort/sort-list/__option/sort-list__option.pack',
        sort: './blocks/sort/sort.pack',
        sortAndSearch: './blocks/sortAndSearch/sortAndSearch.pack',
        sortJS: './blocks/sort/sort'
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
