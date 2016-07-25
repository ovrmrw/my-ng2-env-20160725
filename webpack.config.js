'use strict';

const webpack = require('webpack');


module.exports = {
  entry: {
    vendor: './config/vendor.ts',
    main: './src/main.ts',
  },
  output: {
    path: '.dest',
    filename: 'webpack.bundle.[name].js'
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' })
  ],
  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loaders: [
          'awesome-typescript-loader?tsconfig=config/tsconfig.bundle.json',
          'angular2-template-loader'
        ],
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.css$/,
        loader: 'raw-loader'
      }
    ]
  },
  devtool: 'source-map',
};