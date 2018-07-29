const path = require('path');
const hotReloadingTransformer = require('./tools/typescript/hotReloadingTransformer');

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
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            forceIsolatedModules: true,
            transpileOnly: true,
            getCustomTransformers: (program) => ({
              before: [hotReloadingTransformer(program)],
            }),
          },
        },
      },
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
    ],
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'examples'),
    port: 9000,
  },
};
