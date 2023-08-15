export const cloudUrl = `${location.protocol}//${process.env.ILLA_CLOUD_URL}`

export const cloudRedirect = `${cloudUrl}?redirectUrl=${encodeURIComponent(
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
