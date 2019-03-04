module.exports = {
	"extends": "google",
	"parser": "babel-eslint",
	"rules": {
		"linebreak-style": 0,
		"max-len": [2, {
			"code": 80,
			"tabWidth": 2,
			"ignoreUrls": true,
			"ignorePattern": "^goog\.(module|require)",
			"ignoreStrings": true,
			"ignoreTemplateLiterals": true,
		}],
		"require-jsdoc": ["error", {
			"require": {
				"FunctionDeclaration": false,
				"MethodDefinition": false,
				"ClassDeclaration": false,
				"ArrowFunctionExpression": false,
				"FunctionExpression": false
			}
		}]
	}
};
