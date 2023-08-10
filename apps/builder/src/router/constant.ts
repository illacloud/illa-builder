export const cloudUrl = `${location.protocol}//${process.env.VITE_CLOUD_URL}`

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
