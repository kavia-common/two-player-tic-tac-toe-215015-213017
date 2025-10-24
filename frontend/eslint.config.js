import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import eslintConfigPrettier from 'eslint-config-prettier';

/**
 * ESLint v9 flat config for React + TypeScript project.
 * - Uses @typescript-eslint for TS rules
 * - React and react-hooks rules enabled
 * - Accessibility and import rules
 * - Prettier config to disable conflicting style rules
 */
export default [
  // Base JS recommended
  js.configs.recommended,

  // TypeScript support
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: false, // keep simple, no project lookup; aligns with tsconfig and fast lint
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
    },
    rules: {
      // TypeScript recommended
      ...tseslint.configs['recommended'].rules,

      // React and Hooks
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // not needed with React 17+
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibility
      ...jsxA11y.configs.recommended.rules,

      // Import hygiene
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/no-duplicates': 'warn',

      // General hygiene
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      // Ensure import plugin resolves TS extensions sensibly
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },

  // Apply Prettier last to disable conflicting rules
  eslintConfigPrettier,
];
