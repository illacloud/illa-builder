import { defineConfig } from "vite"
import { resolve } from "path"
import react from "@vitejs/plugin-react"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      jsxRuntime: "automatic",
      babel: {
        plugins: ["@emotion/babel-plugin"],
        compact: false,
      },
      // Exclude storybook stories
      exclude: [
        /\.stories\.([tj])sx?$/,
        /\.e2e\.([tj])sx?$/,
        /\.test\.([tj])sx?$/,
      ],
      // Only .tsx files
      include: ["**/*.tsx", "**/*.ts"],
    }),
    svgr(),
    chunkSplitPlugin({
      customSplitting: {
        "react-vendor": ["react", "react-dom"],
        "design-libs": ["@illa-design/react"],
        "editor-page": [/src\/page\/Editor/],
        "setting-page": [/src\/page\/Setting/],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
})
