
const path = require('path');

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
        test: /\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  }
};

