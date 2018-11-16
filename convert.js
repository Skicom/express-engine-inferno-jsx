const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const template = require('@babel/template');
const t = require('@babel/types');
const fs = require('fs');
const attrMap = require('./data/attr-map');
const options = require('./options');

let createExportFunction;

module.exports = function(jsxPath, outPath) {
	const code = fs.readFileSync(jsxPath).toString();

	let ast = parser.parse(code, {
		sourceType: 'module',
		strictMode: false,
		plugins: ['jsx']
	});

	traverse(ast, {
		enter: function prepare(path) {
			path.get('body').forEach(function(item) {
				if (
					item.isExpressionStatement() &&
					item.node.expression.type === 'JSXElement'
				) {
					item.replaceWith(
						t.assignmentExpression(
							'=',
							t.identifier('__components'),
							item.node.expression
						)
						// t.callExpression(
						// 	t.memberExpression(t.identifier('__components'), t.identifier('push')),
						// 	[item.node.expression]
						// )
					);
				}
			});

			path.traverse({
				JSXAttribute: function(attr) {
					const name = attr.node.name.name;

					if (name === 'class') {
						attr.node.name.name = 'className';
					} else if (attrMap.hasOwnProperty(name)) {
						attr.node.name.name = attrMap[name];
					}
				},
				CallExpression: function(func) {
					if (
						func.node.callee.type === 'Identifier' &&
						func.node.callee.name === 'require'
					) {
						func.node.callee.name = 'requireJSX';
						func.node.arguments.push(t.identifier('__dirname'));
					}
				}
			});

			path.stop();
		}
	});

	if (!createExportFunction) {
		createExportFunction = template.parse(options.template);
	}

	ast = createExportFunction({
		BODY: ast.program.body
	});

	ast = t.program(ast);

	let babelOptions = options.babelOptions;
	babelOptions.ast = false;

	const res = babel.transformFromAst(ast, '', babelOptions);

	mkdir(outPath);

	fs.writeFileSync(outPath, res.code);
};

function mkdir(path) {
	path = path.replace(/[\/\\][^\/\\]+\.\w+$/, '');

	if (fs.existsSync(path)) return;

	path = path.match(/[\/\\][^\/\\]+/g);

	let root = '';
	let dirs = [];
	let len;

	for (let i = path.length; i >= 0; i--) {
		root = path.join('');

		if (!fs.existsSync(root)) {
			dirs.push(path.pop());
		} else {
			break;
		}
	}

	dirs.reverse();

	for (let i = 0, len = dirs.length; i < len; i++) {
		root += dirs[i];

		fs.mkdirSync(root);
	}
}
