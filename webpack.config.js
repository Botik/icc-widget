'use strict';

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV || 'development';
const plugins = [
	new MiniCssExtractPlugin({
		filename: '[name].css'
	}),
	new CleanWebpackPlugin(),
	new webpack.optimize.LimitChunkCountPlugin({
		maxChunks: 1
	})
];
const postcssPlugins = loader => [
	require('postcss-import')({ root: loader.resourcePath }),
	require('postcss-preset-env')({
		browsers: '> 15%',
		features: {
			'nesting-rules': true
		}
	}),
	require('postcss-mixins'),
	require('postcss-utilities')
	// require('cssnano')
];
const babelPlugins = [
	// plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
	['@babel/plugin-proposal-decorators', { legacy: true }],
	['@babel/plugin-proposal-class-properties', { loose: true }, '']
];

module.exports = {
	entry: './index',
	output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: 'app.js'
	},
	devtool: 'development' === mode ? 'source-map' : false,
	mode,
	target: 'web',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						babelrc: false,
						presets: [['@babel/preset-env', { targets: '> 15%, not dead' }], '@babel/preset-react'],
						plugins: babelPlugins
					}
				}
			},
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
			{
				test: /\.css/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: true,
							localIdentName: '_[name]_[local]_[hash:base64:5]'
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: postcssPlugins
						}
					}
				]
			}
		]
	},
	plugins
};
