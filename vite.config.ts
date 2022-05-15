import { defineConfig } from "vite"
import { resolve } from "path"
import react from "@vitejs/plugin-react"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"

function renderChunks(deps: Record<string, string>) {
  let chunks: Record<string, string[]> = {}
  Object.keys(deps).forEach((key) => {
    if (["react", "react-router-dom", "react-dom"].includes(key)) return
    chunks[key] = [key]
  })
  return chunks
}

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
    },
  },
})
