import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
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
      sourcemap: true,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            "@emotion": ["@emotion/react"],
            "@illa-design": ["@illa-design/react"],
            "react-icons-vendor": [
              "react-icons",
              "react-icons/ai",
              "react-icons/bi",
              "react-icons/bs",
              "react-icons/cg",
              "react-icons/ci",
              "react-icons/di",
              "react-icons/fa",
              "react-icons/fc",
              "react-icons/fi",
              "react-icons/gi",
              "react-icons/go",
              "react-icons/gr",
              "react-icons/hi",
              "react-icons/hi2",
              "react-icons/im",
              "react-icons/io",
              "react-icons/io5",
              "react-icons/md",
              "react-icons/ri",
              "react-icons/rx",
              "react-icons/si",
              "react-icons/sl",
              "react-icons/tb",
              "react-icons/tfi",
              "react-icons/ti",
              "react-icons/vsc",
              "react-icons/wi",
            ],
            "codeMirror-vendor": [
              "@codemirror/autocomplete",
              "@codemirror/commands",
              "@codemirror/lang-html",
              "@codemirror/lang-javascript",
              "@codemirror/lang-sql",
              "@codemirror/lang-xml",
              "@codemirror/language",
              "@codemirror/lint",
              "@codemirror/search",
              "@codemirror/state",
              "@codemirror/view",
              "@uiw/codemirror-theme-github",
            ],
            "lodash-lib": ["lodash"],
          },
        },
      },
    },
    server: {
      port: 3000,
      https: true,
      proxy: {
        "/supervisor/api/v1": {
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
