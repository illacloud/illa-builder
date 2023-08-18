import { fetchCopyApp } from "@/services/apps"

const APP_NAME_MAX_LENGTH = 128
const COPY_SUFFIX = " Copy"
const trimmedLength = APP_NAME_MAX_LENGTH - COPY_SUFFIX.length
export const duplicateApp = (appId: string, appName?: string) => {
  const newAppName = `${(appName || "").slice(0, trimmedLength)}${COPY_SUFFIX}`
  return fetchCopyApp(appId, newAppName)
}
