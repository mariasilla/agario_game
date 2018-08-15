
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    "filename": "[name].bundle.js",
    path: path.join(process.cwd(), "dist")
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


