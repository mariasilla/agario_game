const path = require('path');
const SassPlugin = require('sass-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new SassPlugin('./src/style.scss', process.env.NODE_ENV)
    ],
    mode: 'development',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'src')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};

