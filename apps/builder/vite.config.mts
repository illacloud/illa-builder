import mdx from "@mdx-js/rollup"
import { sentryVitePlugin } from "@sentry/vite-plugin"
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
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  const BASIC_PLUGIN = [
    mdx(),
    react({
      jsxImportSource: "@emotion/react",
    }),
    svgr(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/**.{ts,tsx}" --config ".eslintrc.js"',
        dev: {
          logLevel: ["error", "warning"],
        },
      },
    }),
    visualizer(),
  ]

  const DEVELOPMENT_PLUGIN = [basicSsl()]
  const plugin = BASIC_PLUGIN
  const version = pkg.version

  if (command === "serve") {
    plugin.push(...DEVELOPMENT_PLUGIN)
  } else {
    if (env.VITE_INSTANCE_ID === "CLOUD" && env.ILLA_SENTRY_AUTH_TOKEN) {
      plugin.push(
        sentryVitePlugin({
          org: "sentry",
          project: "illa-builder",
          url: "http://sentry.illasoft.com/",
          authToken: env.ILLA_SENTRY_AUTH_TOKEN,
          release: {
            name: `illa-builder@${version}`,
            uploadLegacySourcemaps: {
              urlPrefix: "~/assets",
              paths: ["./dist/assets"],
              ignore: ["node_modules"],
            },
            deploy: {
              env: env.ILLA_APP_ENV,
            },
          },
        }),
      )
    }
  }
  writeFileSync("./public/appInfo.json", `{"version":${version}}`)

  return {
    plugins: plugin,
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
            "react-icons-vendor": [
              "react-icons",
              "react-icons/bs",
              "react-icons/fc",
              "react-icons/sl",
              "react-icons/tb",
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
