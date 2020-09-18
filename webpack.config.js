const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const dist = __dirname + '/dist'
const src = __dirname + '/src'

const isDev = process.env.NODE_ENV === 'development'

const optimization = function() {
	const config = {
		splitChunks: {
			chunks: 'all'
		}
	}

	if (!isDev) {
		config.minimizer = [
			new OptimizeCssAssetsPlugin(),
			new TerserPlugin()
		]
	}

	return config
}

const cssLoader = exstra => {
	const loader = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true
			}
		},
		'css-loader'
	]

	if (exstra) {
		loader.push(exstra)
	}

	return loader
}

const jsLoaders = () => {
	const loaders = [{
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env'],
			plugins: [
				'@babel/plugin-proposal-class-properties'
			]
		}
	}]

	if (isDev) {
		loaders.push('eslint-loader')
	}

	return loaders
}

module.exports = {
	context: src,
	mode: 'development',
	entry: [
		'@babel/polyfill',
		'./index.js'
	],
	output: {
		filename: '[name].bundle.[hash].js',
		path: dist
	},
	resolve: {
		extensions: ['.js'],
	},
	optimization: optimization(),
	devServer: {
		port: 4200,
		hot: isDev
	},
	devtool: isDev ? 'source-map' : '',
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: !isDev
			}
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css'
		})
	],
	module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoader()
			},
			{
				test: /\.sass$/,
				use: cssLoader('sass-loader')
			},
			{
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      }
    ],
  }
}
