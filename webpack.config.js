const webpackBackend = require('./config/webpack.backend');
const webpackFrontend = require('./config/webpack.frontend');

module.exports = function(env) {
	console.log('build env: ', env);
	const isDevBuild = env.development === true;
	const buildConfig = {
		appName: env.appName,
		mode: isDevBuild ? 'development' : 'production',
		isDevBuild: isDevBuild,
		shouldUseSourceMap: isDevBuild,
	};
	console.log('build config: ', buildConfig);
	return [
		webpackBackend(buildConfig),
		webpackFrontend(buildConfig),
	];
};
