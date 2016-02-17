'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, './src/Studio.jsx')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'build/bundle.js'
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    // new ExtractTextPlugin('css/[name]-[hash].min.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  devtool: 'source-map',
  context: __dirname,
  node:{
    fs:'empty',
    json:'empty',
    console:true
  },
  module: {
    loaders: [
    // {
    //   test: /\.(ts|tsx)?$/,
    //   exclude: /node_modules/,
    //   loaders:['babel','ts-loader']
    // },
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
    {
      test: /\.json?$/,
      loader: 'json'
    }
    // {
    //     test:   /\.(png|gif|jpe?g|svg)$/i,
    //     loader: 'url',
    //     query: {
    //       limit: 10000
    //     }
    // },
    // {
    //   test: /\.scss$/,
    //   loaders: ["style", "css","sass"]
    // }
    ]
  }
};