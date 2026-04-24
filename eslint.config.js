import jsdoc from 'eslint-plugin-jsdoc';

export default [
    {
        ignores: ['src/lib/**'],
    },
    {
        files: ['src/**/*.js', 'htdocs/**/*.js', 'test/**/*.js'],
        languageOptions: {
            sourceType: 'module',
        },
        rules: {
            strict: ['error', 'never'],
            'no-octal': 'error',
            'no-octal-escape': 'error',
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'WithStatement',
                    message: '`with` statements are forbidden (SyntaxError in strict mode / ESM).',
                },
            ],
        },
    },
    {
        files: ['src/**/*.js', 'htdocs/**/*.js'],
        plugins: { jsdoc },
        settings: {
            jsdoc: {
                preferredTypes: {
                    object: 'Use a more specific type (e.g. structured typedef) instead of generic "object".',
                    Object: 'Use a more specific type (e.g. structured typedef) instead of generic "Object".',
                    Function: 'Use a more specific type with parameter signatures instead of generic "Function".',
                    function: 'Use a more specific type with parameter signatures instead of generic "function".',
                    any: 'Use a more specific type (e.g., string, number, Component) or a union type instead of "any".',
                },
            },
        },
        rules: {
            'jsdoc/require-jsdoc': [
                'error',
                {
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                        ArrowFunctionExpression: true,
                        FunctionExpression: true,
                        ClassExpression: true,
                    },
                },
            ],
            'jsdoc/require-param': 'error',
            'jsdoc/require-param-description': 'error',
            'jsdoc/require-param-type': 'error',
            'jsdoc/require-returns': 'error',
            'jsdoc/require-returns-type': 'error',
            'jsdoc/require-returns-description': 'error',
            'jsdoc/check-types': 'error',
            'jsdoc/no-undefined-types': [
                'error',
                {
                    definedTypes: [
                        'HTMLElement',
                        'HTMLFormElement',
                        'HTMLDivElement',
                        'HTMLInputElement',
                        'Element',
                        'Node',
                        'Document',
                        'Window',
                        'Event',
                        'MouseEvent',
                        'ResizeObserver',
                        'Console',
                    ],
                },
            ],
            'jsdoc/check-tag-names': 'error',
            'jsdoc/check-param-names': 'error',
            'jsdoc/valid-types': 'error',
            'jsdoc/require-description': [
                'error',
                {
                    contexts: [
                        'FunctionDeclaration',
                        'MethodDefinition',
                        'ArrowFunctionExpression',
                        'FunctionExpression'
                    ],
                },
            ],
        },
    },
];
