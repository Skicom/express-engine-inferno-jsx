const options = require('../options');
options.babelOptions = {
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
					'@ext': require('path').resolve(__dirname, 'something')
				}
			}
		],
		['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
		['babel-plugin-inferno', { imports: true }],
		'@babel/plugin-syntax-jsx'
	]
};
const engine = require('../index');
const sample = require('./sample');