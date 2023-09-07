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

const getUsedEnv = (env: Record<string, string>) => {
  const usedEnv: Record<string, string> = {}
  Object.keys(env).forEach((key) => {
    if (key.startsWith("ILLA_")) {
      let value = env[key]
      if (key === "ILLA_APP_VERSION") {
        value = pkg.version
      }
      usedEnv[`import.meta.env.${key}`] = JSON.stringify(value)
      usedEnv[`process.env.${key}`] = JSON.stringify(value)
    }
  })
  return usedEnv
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  const useHttps = env.ILLA_USE_HTTPS === "true"
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
    visualizer({
      template: "network",
    }),
  ]

  const plugin = BASIC_PLUGIN
  const version = pkg.version

  if (command === "serve" && useHttps) {
    plugin.push(basicSsl())
  } else {
    if (env.ILLA_INSTANCE_ID === "CLOUD" && env.ILLA_SENTRY_AUTH_TOKEN) {
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
    envPrefix: ["ILLA_"],
    define: getUsedEnv(env),
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
      https: useHttps,
    },
    preview: {
      port: 4173,
    },
  }
})
