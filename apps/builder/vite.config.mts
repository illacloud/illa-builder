import mdx from "@mdx-js/rollup"
import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, loadEnv } from "vite"
import checker from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"
import versionConfig from "./public/appInfo.json"

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "")
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
      "import.meta.env.ILLA_APP_VERSION": JSON.stringify(versionConfig.version),
      "import.meta.env.ILLA_BUILDER_ENV": JSON.stringify(env.ILLA_BUILDER_ENV),
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
    },
  }
})
