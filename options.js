module.exports = {
	cache: '',
	views: '',
	viewCache: false,
	requireAlias: {},
	appSrc: 'apps-inferno/src',
	serverRoot: __dirname,
	typescriptSupport: false,
	babelOptions: {
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage',
					debug: false,
					targets: {
						node: 'current'
					}
				}
			]
		],
		plugins: [
			[
				'module-resolver',
				{
					alias: {
						'apps-inferno': require('path').resolve(
							__dirname + '/apps-inferno/src/'
						)
					}
				}
			],
			'@babel/plugin-proposal-decorators',
			['@babel/plugin-proposal-class-properties', { loose: true }],
			['babel-plugin-inferno', { imports: true }],
			'@babel/plugin-syntax-jsx'
		]
	},
	appRoot: __dirname + '/apps-inferno/src',
	doctype: '<!DOCTYPE html>\n',
	template: `
var requireJSX = require('express-engine-inferno-jsx/require');

module.exports = function (props) {
	var __components;
	BODY
	return __components;
};`
};
