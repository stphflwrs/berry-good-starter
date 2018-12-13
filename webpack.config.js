const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  mode: env === 'development' ? 'development' : 'production',
  devtool: 'source-map',
  entry: resolve(__dirname, 'src/main.ts'),
  output: {
    filename: env === 'development' ? '[name].js' : '[name].[hash].js',
    path: resolve(__dirname, 'bundle'),
  },
  resolve: {
    alias: {
      'styles': resolve(__dirname, 'src', 'styles'),
    },
  },
  module: {
    rules: [{
      test: /\.sass$/,
      use: [{
        loader: 'css-loader',
      }, {
        loader: 'sass-loader',
      }],
    }, {
      test: /.ts$/,
      use: [{
        loader: 'ts-loader',
      }],
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html'),
    }),
  ],
};
