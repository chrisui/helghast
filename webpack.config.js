const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        include: path.resolve(__dirname, 'src'),
        use: {loader: 'awesome-typescript-loader'},
      },
      // {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'examples'),
    port: 9000,
  },
};
