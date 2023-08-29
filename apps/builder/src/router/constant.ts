export const cloudUrl = `${import.meta.env.ILLA_CLOUD_URL}`

export const cloudRedirect = `${cloudUrl}?redirectURL=${encodeURIComponent(
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
