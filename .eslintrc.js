module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    "no-plusplus": "off",
    "max-classes-per-file": "off",
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/no-use-before-define": "off",
  }
};