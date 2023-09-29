const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")

const ENV_PREFIX = "ILLA_"

const ENV_LOCAL_FILE_PATH = path.resolve(__dirname, "..", ".env.local")
const ENV_DEV_LOCAL_FILE_PATH = path.resolve(__dirname, "..", ".env.development.local")

dotenv.config({ path: ENV_LOCAL_FILE_PATH, override: true })
dotenv.config({ path: ENV_DEV_LOCAL_FILE_PATH, override: true })

fetch("https://vnfxllrjvmzlialmdqrd.supabase.co/rest/v1/CI_INFO?select=*", {
  headers: {
    apikey: process.env.ILLA_SUPABASE_KEY,
    Authorization: `Bearer ${process.env.ILLA_SUPABASE_KEY}`
  }
}).then(res => res.json()).then(res => {
  const envInfo = res[0].resource
  let writeContent = ""
  Object.keys(envInfo).forEach(resourceType => {
    const resourceInfo = envInfo[resourceType]
    Object.keys(resourceInfo).forEach(resourceKey => {
      const resourcePrefix = resourceType.toUpperCase()
      const envKey = `${ENV_PREFIX}${resourcePrefix}_${resourceKey.toUpperCase()}`
      const envValue = resourceInfo[resourceKey]
      if ((typeof envValue === "string" || typeof envValue === "number") && resourceKey !== "resourceType")
        writeContent += `${envKey}=${envValue}\n`
    })
  })
  fs.writeFileSync(ENV_LOCAL_FILE_PATH, writeContent)
})