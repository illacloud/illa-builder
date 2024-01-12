import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import copy from "rollup-plugin-copy"
import { visualizer } from "rollup-plugin-visualizer"
import { PluginOption, defineConfig, loadEnv } from "vite"
import { checker } from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"
import packageConfig from "./package.json"

const I18N_SOURCE_PATH = resolve(
  __dirname,
  "../../packages/illa-public-component",
  "locales/*.json",
)
const I18N_TARGET_PATH = resolve(__dirname, "public/locales")

const getUsedEnv = (env: Record<string, string>) => {
  const usedEnv: Record<string, string> = {}
  Object.keys(env).forEach((key) => {
    if (key.startsWith("ILLA_")) {
      let value = env[key]
      usedEnv[`import.meta.env.${key}`] = JSON.stringify(value)
      usedEnv[`process.env.${key}`] = JSON.stringify(value)
    }
  })
  usedEnv[`import.meta.env.ILLA_APP_VERSION`] = JSON.stringify(
    packageConfig.version,
  )
  usedEnv[`process.env.ILLA_APP_VERSION`] = JSON.stringify(
    packageConfig.version,
  )
  return usedEnv
}

const VITE_PLUGINS = [
  copy({
    targets: [
      {
        src: [I18N_SOURCE_PATH, "!**/package.json"],
        dest: I18N_TARGET_PATH,
      },
    ],
    hook: "buildStart",
  }),
  react({
    jsxImportSource: "@emotion/react",
  }),
  svgr(),
  checker({
    typescript: true,
    eslint: {
      lintCommand: 'eslint "./src/**/**.{ts,tsx}" --config ".eslintrc.cjs"',
      dev: {
        logLevel: ["error", "warning"],
      },
    },
  }),
  visualizer() as unknown as PluginOption,
]

// https://vitejs.dev/config/
export default defineConfig(async (configEnv) => {
  const { command } = configEnv
  const env = loadEnv(configEnv.mode, process.cwd(), "")
  const useHttps = env.ILLA_USE_HTTPS === "true"
  const isBuildSelfHost =
    env.ILLA_INSTANCE_ID === "SELF_HOST_CLOUD" && command === "build"
  if (useHttps && command === "serve") {
    VITE_PLUGINS.push(basicSsl())
  }
  return {
    base: isBuildSelfHost ? "/cloud" : "/",
    plugins: VITE_PLUGINS,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
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
            "lodash-lib": ["lodash-es"],
          },
        },
      },
    },
    server: {
      https: useHttps,
    },
  }
})
