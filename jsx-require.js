const fs = require('fs');
const babel = require('@babel/core');
const options = require('./options');

require.extensions['.jsx'] = function(module, filename) {
	const content = fs.readFileSync(filename, 'utf8');
	const compiled = babel.transform(content, options.babelOptions).code;
	return module._compile(compiled, filename);
};
