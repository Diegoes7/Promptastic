import react from 'eslint-plugin-react'
import next from '@next/eslint-plugin-next'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'

export default [
	{
		languageOptions: {
			globals: globals.browser,
			parser: '@typescript-eslint/parser',
			ecmaVersion: 'latest',
			sourceType: 'module',
			ecmaFeatures: {
				jsx: true,
			},
		},
		files: ['*.ts', '*.tsx'],
		plugins: {
			react,
			'@typescript-eslint': typescriptEslint,
			'@next/next': next,
			'react-hooks': 'eslint-plugin-react-hooks',
		},
		rules: {
			// Core ESLint recommendations
			'no-unused-vars': 'warn',
			'no-console': 'warn',
			'react-hooks/rules-of-hooks': 'error', // Enforces the Rules of Hooks
			'react-hooks/exhaustive-deps': 'warn', // Checks dependencies of useEffect

			// TypeScript-specific rules
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/explicit-module-boundary-types': 'off',

			// React-specific rules
			'react/react-in-jsx-scope': 'off', // Not needed in Next.js
			'react/prop-types': 'off', // We use TypeScript for prop validation
			'react/jsx-uses-react': 'off',

			// Next.js-specific rules
			'@next/next/no-img-element': 'warn', // Encourage use of next/image

			// Best practices
			semi: ['error', 'always'],
			quotes: ['error', 'single', { avoidEscape: true }],
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		extends: [
			'eslint:recommended', // Basic ESLint recommended rules
			'plugin:@typescript-eslint/recommended', // TypeScript rules
			'plugin:react/recommended', // React rules
			'plugin:@next/next/recommended', // Next.js specific rules
		],
	},
]

// import globals from 'globals'
// import pluginJs from '@eslint/js'
// import tseslint from 'typescript-eslint'
// import pluginReact from 'eslint-plugin-react'

// export default [
// 	{
// 		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
// 	},
// 	{
// 		languageOptions: { globals: globals.browser },
// 		rules: {
// 			'no-unused-vars': 'warn',
// 			'no-undef': 'error',
// 			// '@typescript-eslint/no-explicit-any': 'error',
// 		},
// 		extends: 'next/core-web-vitals',
// 	},
// 	pluginJs.configs.recommended,
// 	...tseslint.configs.recommended,
// 	pluginReact.configs.flat.recommended,
// ]
