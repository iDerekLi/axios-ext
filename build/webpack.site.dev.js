const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackBar = require('webpackbar');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = merge(config, {
  entry: {
    docs: './docs/site/main.js',
  },
  devServer: {
    open: true,
    progress: true,
    host: '0.0.0.0',
    stats: 'errors-only',
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  output: {
    path: path.join(__dirname, '../docs/dist'),
    publicPath: '/',
    chunkFilename: 'async_[name].js',
  },
  resolve: {
    extensions: ['.vue'],
    alias: {
      vue$: 'vue/dist/vue.js',
      'axios-ext$': path.join(__dirname, '../src/axios-ext.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: {
          chunks: 'all',
          minChunks: 2,
          minSize: 0,
          name: 'chunks',
        },
      },
    },
  },
  performance: {
    hints: false,
  },
  plugins: [
    new WebpackBar(),
    new FriendlyErrorsPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['chunks', 'docs'],
      template: path.join(__dirname, '../docs/site/index.html'),
      filename: 'index.html',
    }),
  ],
});
