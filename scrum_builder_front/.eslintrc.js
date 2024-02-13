module.exports = {
  extends: [
    'eslint:recommended', 
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended"
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    // Possible problems
    "no-dupe-else-if": "error",
    "no-duplicate-imports": "error",
    "no-unused-vars": "error",
    "no-dupe-else-if": "error",
    "no-func-assign": "error",
    "no-self-assign":"error",
    "no-unreachable": "error",
    // Sugestions
    "func-name-matching": "warn",
    "eqeqeq": "error",
    "no-console": "warn",
    "no-else-return": "warn",
    "no-undef-init": "warn",
    "no-useless-return": "error",
    "no-var": "error",
    "strict": ["error", "global"],
    // Layout and formating
    "jsx-quotes": ["warn", "prefer-double"],
    "semi-style":['warn', 'last'],
  }
};