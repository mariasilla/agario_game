const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'src')
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    }
};

