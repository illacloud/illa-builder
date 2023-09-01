import { getAuthToken } from "@/utils/auth"
import { needSavedSearchParams } from "../constant"

export const getQS = (searchParams: URLSearchParams) => {
  const qs = searchParams.toString()
  return qs ? `?${qs}` : ""
}

export const removeIgnoredQS = (searchParams: URLSearchParams) => {
  needSavedSearchParams.forEach((key) => {
    searchParams.delete(key)
  })
  return getQS(searchParams)
}

export const translateSearchParamsToURLPathWithSelfHost = (
  searchParams: URLSearchParams,
) => {
  const inviteToken = searchParams.get("inviteToken")
  const teamIdentifier = searchParams.get("teamIdentifier")
  const redirectURL = searchParams.get("redirectURL")
  const qs = getQS(searchParams)
  const authToken = getAuthToken()
  // go to deploy

  if (inviteToken) {
    if (authToken) {
      const qs = removeIgnoredQS(searchParams)
      if (redirectURL) {
        return decodeURIComponent(redirectURL)
      }
      return `/${teamIdentifier}/dashboard/apps${qs}`
    }
    return `/register${
      searchParams.toString() ? "?" + searchParams.toString() : ""
    }`
  }
  // go to workspace,only can use self-host
  if (authToken) {
    return `/0/dashboard/apps${qs}`
  } else {
    return `/login${qs}`
  }
}
