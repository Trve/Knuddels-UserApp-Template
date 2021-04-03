const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const rootPathName = './../';
const distDirName = 'dist';
const root = path.join(__dirname, rootPathName);
const dist = path.join(root, distDirName);
const lib = path.join(root, 'lib');
const src = path.join(root, 'src');
const backend = path.join(src, 'backend');
const userAppEntryPointName = 'main';

module.exports = function(buildConfig) {
	return {
		mode: buildConfig.mode,
		entry: {
			[rootPathName + distDirName + '/' + userAppEntryPointName]: path.join(backend, '/index.ts'),
		},
		output: {
			path: dist,
			filename: '[name].js'
		},
		resolve: {
			alias: {
				'@lib': lib,
				'@backend': backend,
			},
			extensions: ['.ts', '.js']
		},
		module: {
			rules: [
				{
					test: /\.(ts)$/,
					exclude: /node_modules/,
					loader: 'ts-loader'
				},
			]
		},
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
			],
			moduleIds: 'named',
		}
	}
};
