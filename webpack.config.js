const ExtractTextPlugin = require('extract-text-webpack-plugin');
const join = require('path').join;

module.exports = {
  context: join(__dirname, '/public'),

  entry: './js/index.js',

  output: {
    path: './public/build/',
    filename: 'bundle.js'
  },

  devtool: 'inline-source-map',

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /\/node_modules\//,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.styl$/,
        exclude: /\/node_modules\//,
        loader: ExtractTextPlugin.extract('css!stylus?resolve url'),
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('./bundle.css', {
      allChunks: true,
    }),
  ],
}