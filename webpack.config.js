const webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
  devtool: env === 'development' ? 'source-map' : false,
  output: {
    filename: env === 'development' ? '[name].js' : '[name].[hash].js',
  },
  resolve: {
    alias: {
      'styles': path.resolve(__dirname, 'src', 'styles'),
    }
  },
  module: {
    rules: [{
      test: /\.sass$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }],
        fallback: 'style-loader'
      })
    }, {
      test: /.ts$/,
      use: [{
        loader: 'ts-loader'
      }],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new ExtractTextPlugin(env === 'development' ? '[name].css' : '[name].[contentHash].css')
  ]
};
