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
  const appID = searchParams.get("appID")
  const redirectPage = searchParams.get("redirectPage")
  const qs = getQS(searchParams)
  const authToken = getAuthToken()
  // go to deploy
  if (inviteToken && teamIdentifier && appID) {
    if (authToken) {
      const qs = removeIgnoredQS(searchParams)
      if (redirectPage === "edit") {
        return `/${teamIdentifier}/app/${appID}${qs}`
      }
      return `/${teamIdentifier}/deploy/app/${appID}${qs}`
    }
    return `/register${qs}`
  }
  // go to workspace,only can use self-host
  if (authToken) {
    return `/0/dashboard/apps${qs}`
  } else {
    return `/login${qs}`
  }
}
