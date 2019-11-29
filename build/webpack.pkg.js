const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base');
const webpack = require('webpack');
const pkg = require('../package');

const isMinify = process.argv.indexOf('-p') !== -1;

const banner = `
axios-ext v${pkg.version}

Copyright (c) 2019-present Derek Li
Released under the MIT License - https://choosealicense.com/licenses/mit/

https://github.com/iDerekLi/axios-ext
`;

module.exports = merge(config, {
  mode: 'production',
  entry: {
    'axios-ext': './es/index.js',
  },
  output: {
    path: path.join(__dirname, '../lib'),
    library: 'axiosExt',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true,
    // https://github.com/webpack/webpack/issues/6522
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  externals: {},
  performance: false,
  optimization: {
    minimize: isMinify,
  },
  plugins: [new webpack.BannerPlugin(banner.trim())],
});
