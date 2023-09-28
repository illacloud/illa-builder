const path = require("path")
const childProcess = require("child_process");
const dotenv = require("dotenv")


const ENV_LOCAL_FILE_PATH = path.resolve(__dirname, "..", ".env.local")
const ENV_DEV_LOCAL_FILE_PATH = path.resolve(__dirname, "..", ".env.development.local")

dotenv.config({ path: ENV_LOCAL_FILE_PATH, override: true })
dotenv.config({ path: ENV_DEV_LOCAL_FILE_PATH, override: true })


childProcess.execSync(`pnpm playwright codegen  ${process.env.ILLA_BUILDER_URL}/${process.env.ILLA_CLOUD_TEAM_IDENTITY}/dashboard/apps --load-storage=.auth/user.json --ignore-https-errors`)