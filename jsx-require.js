const fs = require('fs');
const babel = require('@babel/core');
const options = require('./options');

require.extensions['.jsx'] = function(module, filename) {
	const content = fs.readFileSync(filename, 'utf8');
	console.log('content:', content);
	console.log('options:', options.babelOptions);
	const compiled = babel.transform(content, options.babelOptions).code;
	console.log('compiled:', compiled);
	return module._compile(compiled, filename);
};
