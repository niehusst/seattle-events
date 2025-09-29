// @ts-check

/**
 * An ESLint config that uses the recommended rules from @stylistic/eslint-plugin
 * and enables type-aware linting.
 * @type {import('eslint').Linter.Config}
 */
export default [
  {
    // Apply recommended rules to all JavaScript and TypeScript files
    files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.ts', '**/*.mts', '**/*.cts'],
    rules: {
      // Add recommended rules from @stylistic/eslint-plugin
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/max-len': ['error', { 'code': 120 }],
      '@stylistic/comma-dangle': ['error', 'only-multiline'],
      // Add other recommended rules as needed
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