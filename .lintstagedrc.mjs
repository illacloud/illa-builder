export default {
  "*.{ts,tsx}": ["prettier --write"],
  "!(*test).{ts,tsx}": (fileNames) =>
    fileNames.length > 10
      ? ["eslint --config .eslintrc.js"]
      : [
          `eslint --config .eslintrc.js ${fileNames.join(" ")}`,
          "pnpm run ts-check",
        ],
}
