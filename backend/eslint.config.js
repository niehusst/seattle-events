// @ts-check

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    // Apply recommended rules to all JavaScript and TypeScript files
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2023,
      sourceType: 'module',
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
      'no-unused-vars': ['error', { "argsIgnorePattern": "^_" }],
      // Add TypeScript-specific rules
      '@typescript-eslint/semi': ['error'],
      '@typescript-eslint/quotes': ['error', 'single'],
      '@typescript-eslint/comma-dangle': ['error', 'only-multiline'],
      '@typescript-eslint/no-unused-vars': ['error', { "argsIgnorePattern": "^_" }],
    },
  },
  {
    // Enable type-aware linting for TypeScript files
    files: ['**/*.ts', '**/*.mts', '**/*.cts'],
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
        global: 'readonly',
        URL: 'readonly',
        __dirname: 'readonly',
      }
    },
    rules: {
      // Add TypeScript-specific rules here
    },
  },
];