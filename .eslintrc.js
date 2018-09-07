module.exports = {
  parser: "babel-eslint",
  extends: [
    "plugin:prettier/recommended",
  ],
  plugins: ["import"],
  rules: {
    strict: 0,
    indent: ["error", 2, { SwitchCase: 1 }],
    semi: ["error", "never"],
    "space-before-function-paren": "off",
    "keyword-spacing": "off",
    "func-names": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "function-paren-newline": "off",
    "no-unused-vars": "warn",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "no-console": "off",
    "prefer-destructuring": "off",
    "no-param-reassign": "warn",
    "no-plusplus": "off",
    "no-continue": "off",
    "no-mixed-operators": "off",
    "object-curly-newline": "off",
    "no-underscore-dangle": "off",
    "no-cond-assign": "off"
  },
  env: {
    browser: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
}
