const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');


module.exports = {
entry: {
main: './src/index.js',
styles: './src/style.css'
},
mode: 'development',
output: {
"filename": "[name].bundle.js",
"chunkFilename": "[id].chunk.js",
path: path.join(process.cwd(), "dist")
},
module: {
rules: [
{
"test": /\.css$/,
"loaders": ExtractTextPlugin.extract({
"use": [
{
"loader": "css-loader",
"options": {
"sourceMap": true
}
},
{
"loader": "postcss-loader",
"options": {
"sourceMap": true
}
}
],
"publicPath": ""
})
},
{
"test": /\.js$/,
"exclude": /node_modules/,
"loader": "babel-loader"
}
]
},
plugins: [
new CleanWebpackPlugin(['dist']),
new ExtractTextPlugin({
"filename": "[name].bundle.css"
}),
new HtmlWebpackPlugin({
filename: 'index.html'
})
]
};

