const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {test: /\.(t|j)sx?$/, use: {loader: 'awesome-typescript-loader'}},
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'examples'),
    port: 9000,
  },
};
