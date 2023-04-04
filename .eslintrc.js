module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: {
        project: "apps/*/tsconfig.json",
      },
    },
  },
  extends: [
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint/eslint-plugin", "import"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
  ignorePatterns: ["ILLA_PROTO.ts"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "import/default": "off",
    "react/no-unknown-property": ["error", { ignore: ["css"] }],
  },
}
