import { getILLACloudURL } from "@illa-public/utils"

export const cloudRedirect = `${getILLACloudURL()}?redirectURL=${encodeURIComponent(
  location.origin + location.pathname,
)}`

export const needSavedSearchParams = [
  "inviteToken",
  "email",
  "appID",
  "teamIdentifier",
  "token",
  "redirectPage",
]
