module.exports = {
  root: true,
  settings: {
    "import/resolver": {
      typescript: {
        project: "./tsconfig.json",
      }
    },
  },
  extends: ["illa"],
}
