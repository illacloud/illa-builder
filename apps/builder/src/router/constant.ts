export const cloudUrl = `${location.protocol}//${
  import.meta.env.VITE_CLOUD_URL
}`

export const cloudRedirect = `${cloudUrl}?redirectUrl=${encodeURIComponent(
  location.origin + location.pathname,
)}`

export const needSavedSearchParams = [
  "inviteToken",
  "email",
  "appID",
  "teamIdentifier",
  "token",
]
