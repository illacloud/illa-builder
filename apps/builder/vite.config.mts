import mdx from "@mdx-js/rollup"
import { sentryVitePlugin } from "@sentry/vite-plugin"
import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"
import { writeFileSync } from "fs"
import { resolve } from "path"
import copy from "rollup-plugin-copy"
import { visualizer } from "rollup-plugin-visualizer"
import { defineConfig, loadEnv } from "vite"
import { PluginOption } from "vite"
import checker from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"
import pkg from "./package.json"

const warningsToIgnore = [
  ["SOURCEMAP_ERROR", "Can't resolve original location of error"],
  ["INVALID_ANNOTATION", "contains an annotation that Rollup cannot interpret"],
]

const I18N_SOURCE_PATH = resolve(
  __dirname,
  "../../packages/illa-public-component",
  "locales/*.json",
)
const I18N_TARGET_PATH = resolve(__dirname, "src/i18n/locale")

const muteWarningsPlugin = (warningsToIgnore: string[][]): PluginOption => {
  const mutedMessages = new Set()
  return {
    name: "mute-warnings",
    enforce: "pre",
    config: (userConfig) => ({
      build: {
        rollupOptions: {
          onwarn(warning, defaultHandler) {
            if (warning.code) {
              const muted = warningsToIgnore.find(
                ([code, message]) =>
                  code == warning.code && warning.message.includes(message),
              )

              if (muted) {
                mutedMessages.add(muted.join())
                return
              }
            }

            if (userConfig.build?.rollupOptions?.onwarn) {
              userConfig.build.rollupOptions.onwarn(warning, defaultHandler)
            } else {
              defaultHandler(warning)
            }
          },
        },
      },
    }),
    closeBundle() {
      const diff = warningsToIgnore.filter((x) => !mutedMessages.has(x.join()))
      if (diff.length > 0) {
        this.warn(
          "Some of your muted warnings never appeared during the build process:",
        )
        diff.forEach((m) => this.warn(`- ${m.join(": ")}`))
      }
    },
  }
}

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
  const isBuildSelfHost =
    env.ILLA_INSTANCE_ID === "SELF_HOST_CLOUD" && command === "build"
  const BASIC_PLUGIN = [
    copy({
      targets: [
        {
          src: [I18N_SOURCE_PATH, "!**/package.json"],
          dest: I18N_TARGET_PATH,
        },
      ],
      hook: "buildStart",
    }),
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
    muteWarningsPlugin(warningsToIgnore),
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
          url: "https://sentry.illasoft.com/",
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
    base: isBuildSelfHost ? "/build" : "/",
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
    },
    preview: {
      port: 4173,
    },
  }
})
