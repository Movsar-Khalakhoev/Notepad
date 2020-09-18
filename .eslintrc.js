module.exports = {
	'parser': 'babel-eslint',
	'env': {
		'es6': true,
		'browser': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'google'
	],
	'rules': {
		'require-jsdoc': 'off',
		'linebreak-style': ['error', 'windows'],
		'comma-dangle': 'off',
		'no-tabs': 'off',
		'indent': 'off',
		'semi': 'off',
		'no-debugger': 'off',
		'arrow-parens': 'off'
	}
}
