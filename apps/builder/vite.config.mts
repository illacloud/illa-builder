import mdx from "@mdx-js/rollup"
import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"
import { writeFileSync } from "fs"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, loadEnv } from "vite"
import checker from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"
import pkg from "./package.json"

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "")
  const version = pkg.version
  writeFileSync("./public/appInfo.json", `{"version":${version}}`)
  return {
    plugins: [
      react({
        jsxImportSource: "@emotion/react",
      }),
      svgr(),
      mdx(),
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
    envPrefix: ["VITE_", "ILLA_"],
    define: {
      "import.meta.env.ILLA_APP_VERSION": JSON.stringify(pkg.version),
      "import.meta.env.ILLA_APP_ENV": JSON.stringify(env.ILLA_APP_ENV),
      "import.meta.env.ILLA_GOOGLE_MAP_KEY": JSON.stringify(
        env.ILLA_GOOGLE_MAP_KEY,
      ),
      "import.meta.env.ILLA_MIXPANEL_API_KEY": JSON.stringify(
        env.ILLA_MIXPANEL_API_KEY,
      ),
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
            "react-icons-vendor": ["react-icons"],
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
    },
  }
})
