const path = require('path');
const hotReloadingTransformer = require('./tools/typescript/hotReloadingTransformer');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'examples'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    noParse: [/node_modules\/benchmark/],
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            forceIsolatedModules: true,
            transpileOnly: true,
            getCustomTransformers: program => ({
              // before: [hotReloadingTransformer(program)],
            }),
          },
        },
      },
      {
        test: /\.(glsl|vert|frag)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['raw-loader', 'glslify-loader'],
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
