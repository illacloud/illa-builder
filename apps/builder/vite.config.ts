import { defineConfig } from "vite"
import { resolve } from "path"
import react from "@vitejs/plugin-react"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"
import svgr from "vite-plugin-svgr"
import { visualizer } from "rollup-plugin-visualizer"

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
        "illa-i18n": [/src\/i18n/],
        "design-libs": [/illa-design\/packages/],
        "app-page": [/src\/page\/App/],
        "dashboard-page": [/src\/page\/Dashboard/],
        "setting-page": [/src\/page\/Setting/],
        "widget-library": [/src\/widgetLibrary/],
      },
    }),
    visualizer(),
  ],
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@assets": resolve(__dirname, "src/assets"),
    },
  },
  build: {
    sourcemap: false,
  },
})
