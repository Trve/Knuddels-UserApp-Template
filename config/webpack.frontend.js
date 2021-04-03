const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const root = path.join(__dirname, './../');
const lib = path.join(root, 'lib');
const dist = path.join(root, 'dist');
const src = path.join(root, 'src');
const frontend = path.join(src, 'frontend');

module.exports = function(buildConfig) {
	const distFrontend = path.join(dist, './www/');
	const frontendTemplates = path.join(frontend, './templates/');
	const frontendStyles = path.join(frontend, './styles/');
	return {
		mode: buildConfig.mode,
		entry: {
			[buildConfig.appName]: [
				path.join(frontend, './frontend.tsx'),
				path.join(frontendStyles, './frontend.css'),
			],
		},
		output: {
			path: distFrontend,
			filename: '[name].js?[contenthash]'
		},
		resolve: {
			alias: {
				'@lib': lib,
				'@frontend': frontend,
			},
			extensions: ['.ts', '.tsx', '.js', '.css', 'scss']
		},
		module: {
			rules: [
				{
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					loader: 'ts-loader'
				},
				{
					test: /\.(css|scss)$/,
					exclude: /node_modules/,
					use: [
						ExtractCssChunks.loader,
						'css-loader'
					],
				},
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: path.join(frontendTemplates, 'frontend.html'),
				filename: path.join(distFrontend, buildConfig.appName + '.html'),
				inject: true,
				minify: {
					minifyCSS: true,
					minifyJS: true,
					collapseWhitespace: !buildConfig.isDevBuild,
					removeComments: !buildConfig.isDevBuild,
					removeRedundantAttributes: !buildConfig.isDevBuild,
					removeScriptTypeAttributes: !buildConfig.isDevBuild,
					removeStyleLinkTypeAttributes: !buildConfig.isDevBuild,
				}
			}),
			new ExtractCssChunks({
				filename: '[name].css?[contenthash]'
			}),
		],
		optimization: {
			minimize: !buildConfig.isDevBuild,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						sourceMap: buildConfig.shouldUseSourceMap,
						compress: buildConfig.isDevBuild ? false : {
							ecma: 2015,
							drop_console: true,
						},
						mangle: !buildConfig.isDevBuild,
						keep_fnames: buildConfig.isDevBuild,
						keep_classnames: undefined,
						ie8: false,
						safari10: false,
					},
					extractComments: false,
				}),
				new OptimizeCSSAssetsPlugin({}),
			],
			moduleIds: 'named',
			splitChunks: {
				cacheGroups: {
					styles: {
						// fix from https://github.com/webpack/webpack/issues/7300#issuecomment-702840962
						type: 'css/mini-extract',
						name: 'styles',
						test: /\.css$/,
						chunks: 'all',
						enforce: true,
					},
				},
			},
		}
	};
};
