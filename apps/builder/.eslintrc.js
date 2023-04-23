module.exports = {
  root: true,
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      }
    },
  },
  extends: ["../../.eslintrc.js"],
  plugins: ["import"],
}
