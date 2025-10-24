module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
    project: false
  },
  settings: {
    react: { version: "detect" }
  },
  plugins: ["react", "react-hooks", "@typescript-eslint", "import", "jsx-a11y"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_", "ignoreRestSiblings": true }],
    "import/order": ["warn", { "alphabetize": { "order": "asc", "caseInsensitive": true }, "newlines-between": "always" }],
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  },
  ignorePatterns: ["dist", "build", "node_modules"]
};
