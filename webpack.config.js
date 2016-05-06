"use strict";

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const use = require('postcss-use');
// ?modules&importLoaders=2&localIdentName=[local]--[hash:base64:5]

module.exports = {
	entry: './index',
	output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: 'app.js'
	},
	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'css-loader!postcss-loader'
				)
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('app.css', {
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true,
				unsafe: true
			}
		})
	],
	postcss: function() {
		return [
			use({
				modules: [
					'postcss-nested',
					'postcss-clearfix',
					'postcss-focus',
					'postcss-inline-svg',
					'postcss-svgo',
					'postcss-mixins'
				]
			}),
			cssnext({
				browsers: '> 1%, last 2 versions',
				features: {
					nesting: false,
					rem: {
						rootValue: 10
					}
				}
			})
		];
	}
};
