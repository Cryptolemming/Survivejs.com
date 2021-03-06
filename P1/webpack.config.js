var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var merge = require('webpack-merge');
var webpack = require('webpack');

var TARGET = process.env.TARGET;
var ROOT_PATH = path.resolve(__dirname);

var common = {
	entry: [path.resolve(ROOT_PATH, 'app/main')],
	resolve: {
		extensions: ['', '.js', '.jsx'],	
	},
	output: {
		path: path.resolve(ROOT_PATH, 'build'),
		filename: 'bundle.js',
	},
	plugins: [
		new HTMLWebpackPlugin({
			title: 'Kanban app',
		}),
	],
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style', 'css'],
			},
		],
	},
};

if(TARGET === 'build') {
	module.exports = merge(common, {
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loader: 'babel?stage=1',
					include: path.resolve(ROOT_PATH, 'app'),
				},
			],
		},
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false
				},
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production'),
				}
			}),
		],
	});
}

if(TARGET === 'dev') {
	module.exports = merge(common, {
		entry: [
			'webpack/hot/dev-server'
		],
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loaders: ['react-hot', 'babel?stage=1'],
					include: path.resolve(ROOT_PATH, 'app'),
				},
			],
		},
	});
}