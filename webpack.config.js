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
        header: './blocks/header/header.pack',
        logo: './blocks/header/logo/logo.pack',
        login: './blocks/header/login/login.pack',
        menu: './blocks/header/menu/menu.pack',
        search: './blocks/search/search.pack',
        search__input: './blocks/search/__input/search__input.pack',
        search__iconLoupe: './blocks/search/__icon-loupe/search__icon-loupe.pack',
        questsSet: './blocks/quests-set/quests-set.pack',
        quest: './blocks/quests-set/quest/quest.pack',
        quest__barNew: './blocks/quests-set/quest/__bar-new/quest__bar-new.pack',
        quest__name: './blocks/quests-set/quest/__name/quest__name.pack',
        quest__photo: './blocks/quests-set/quest/__photo/quest__photo.pack',
        quest__stats: './blocks/quests-set/quest/__stats/quest__stats.pack',
        sortBar: './blocks/sort/sort-bar/sort-bar.pack',
        sortBar__iconTriangle: './blocks/sort/sort-bar/__icon-triangle/sort-bar__icon-triangle.pack',
        sortBar__sortChoice: './blocks/sort/sort-bar/__sort-choice/sort-bar__sort-choice.pack',
        sortList: './blocks/sort/sort-list/sort-list.pack',
        sortList__option: './blocks/sort/sort-list/__option/sort-list__option.pack',
        sort: './blocks/sort/sort.pack',
        sortAndSearch: './blocks/sortAndSearch/sortAndSearch.pack'
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
                test: /.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', postcssLoader, 'stylus-loader']
                })
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
