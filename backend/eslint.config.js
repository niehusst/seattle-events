// @ts-check

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/**
 * An ESLint config that uses the recommended rules from ESLint core
 * and enables type-aware linting.
 * @type {import('eslint').Linter.Config}
 */
export default [
  js.configs.recommended,
  {
    // Apply recommended rules to all JavaScript and TypeScript files
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: {
        ...js.configs.recommended.languageOptions.globals,
        process: 'readonly',
        console: 'readonly',
        global: 'readonly',
        URL: 'readonly',
        __dirname: 'readonly',
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Standard ESLint rules
      'semi': ['error', 'always'],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'max-len': ['error', { 'code': 120 }],
      'comma-dangle': ['error', 'only-multiline'],
      // Add TypeScript-specific rules
      '@typescript-eslint/semi': ['error'],
      '@typescript-eslint/quotes': ['error', 'single'],
      '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
      '@typescript-eslint/no-unused-vars': ['error', { "argsIgnorePattern": "^_" }],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
  },
  {
    // Enable type-aware linting for TypeScript files
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    rules: {
      // Add TypeScript-specific rules here
    },
  },
];