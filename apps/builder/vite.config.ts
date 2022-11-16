import { defineConfig, loadEnv } from "vite"
import { resolve } from "path"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "")
  return {
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
          "illa-i18n": [/src\/i18n/],
          "design-libs": [/illa-design\/packages/],
          "app-page": [/src\/page\/App/],
          "dashboard-page": [/src\/page\/Dashboard/],
          "setting-page": [/src\/page\/Setting/],
          "widget-library": [/src\/widgetLibrary/],
        },
      }),
      svgr(),
    ],
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@assets": resolve(__dirname, "src/assets"),
        "@illa-design": resolve(__dirname, "../../illa-design/packages"),
      },
    },
    build: {
      sourcemap: true,
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
        "/room/.*": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          ws: true,
        },
      },
    },
  }
})
