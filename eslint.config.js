const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');

module.exports = [
  // Global ignores must come first
  {
    ignores: ['dist/', 'node_modules/', 'src/routes/'],
  },
  {
    files: ['src/**/*.ts'],
    ignores: ['src/routes/**'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // Google style rules
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'max-len': ['error', { 'code': 120 }], // Increased from 80 to 120
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
      }],
      'object-curly-spacing': ['error', 'always'],
      
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      
      // Disable conflicting rules
      'require-jsdoc': 'off',
      'valid-jsdoc': 'off',
      'new-cap': 'off',
      'no-undef': 'off', // TypeScript handles this
    },
  },
  {
    // Relaxed rules for decorator files where 'any' is necessary for framework code
    files: ['src/decorators/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        // Don't use project config for tests since they're excluded from tsconfig
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // More relaxed rules for tests
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'max-len': ['error', { 'code': 120 }],
      'comma-dangle': ['error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'never',
      }],
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off', // Tests don't need explicit return types
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
