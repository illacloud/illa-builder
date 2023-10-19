import basicSsl from "@vitejs/plugin-basic-ssl"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"
import { visualizer } from "rollup-plugin-visualizer"
import { PluginOption, defineConfig, loadEnv } from "vite"
import { checker } from "vite-plugin-checker"
import svgr from "vite-plugin-svgr"
import packageConfig from "./package.json"

const getUsedEnv = (env: Record<string, string>) => {
  const usedEnv: Record<string, string> = {}
  Object.keys(env).forEach((key) => {
    if (key.startsWith("ILLA_")) {
      let value = env[key]
      if (key === "ILLA_APP_VERSION") {
        value = packageConfig.version
      }
      usedEnv[`import.meta.env.${key}`] = JSON.stringify(value)
      usedEnv[`process.env.${key}`] = JSON.stringify(value)
    }
  })
  return usedEnv
}

const VITE_PLUGINS: PluginOption[] = [
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
            "lodash-lib": ["lodash"],
          },
        },
      },
    },
    server: {
      https: useHttps,
    },
  }
})
