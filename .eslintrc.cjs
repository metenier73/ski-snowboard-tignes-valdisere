module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['dist/', 'node_modules/', '.vite/'],
  plugins: ['react-hooks', 'import', 'react-refresh'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-unresolved': 'error',
  },
  overrides: [
    {
      files: ['*.js'],
      env: { node: true },
      rules: {
        'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      },
    },
  ],
}
