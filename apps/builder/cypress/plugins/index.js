const { startDevServer } = require("@cypress/vite-dev-server")
const path = require("path")
const codeCoverageTask = require("@cypress/code-coverage/task")


module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  on("dev-server:start", async (options) =>
    startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, "..", "vite.config.ts"),
      },
    }),
  )
  codeCoverageTask(on, config);
  return config
}
