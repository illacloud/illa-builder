import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { defineConfig, loadEnv } from "vite"
import checker from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "")
  return {
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
      svgr(),
      checker({
        typescript: true,
      }),
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
        "/supervisior/api/v1": {
          target: env.VITE_PROXY_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        "/builder/api/v1": {
          target: env.VITE_PROXY_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
