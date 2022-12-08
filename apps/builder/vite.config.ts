import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig, loadEnv } from "vite"
import { chunkSplitPlugin } from "vite-plugin-chunk-split"
import svgr from "vite-plugin-svgr"

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
      svgr(),
      basicSsl(),
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
      sourcemap: true,
      reportCompressedSize: false,
    },
    server: {
      port: 3000,
      https: true,
      proxy: {
        "/api": {
          target: env.VITE_PROXY_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
