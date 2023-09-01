import { isCloudVersion } from "@illa-public/utils"
import { AxiosError } from "axios"
import { cloudRedirect } from "@/router/constant"
import { getQS } from "@/router/utils/translateQS"
import { removeAuthToken } from "@/utils/auth"
import { commonBillingErrorHandler } from "@/utils/billing/errorHandler"

const getRedirectPathWhen401 = (searchParams: URLSearchParams) => {
  const inviteToken = searchParams.get("inviteToken")
  const qs = getQS(searchParams)
  if (inviteToken) {
    return `/register${qs}`
  } else {
    return `/login${qs}`
  }
}

export const errorHandlerInterceptor = (error: AxiosError) => {
  const { response } = error
  if (!response) return Promise.reject(error)
  const { href } = location
  const { status } = response
  switch (status) {
    // TODO: @aruseito maybe need custom error status, because of we'll have plugin to request other's api
    case 401: {
      removeAuthToken()
      if (isCloudVersion) {
        // navigate to illa cloud, avoid redirect loop
        if (!href.includes("redirectURL")) {
          window.location.href = cloudRedirect
        }
      } else {
        const { href } = location
        const url = new URL(href)
        const searchParams = url.searchParams
        const path = getRedirectPathWhen401(searchParams)
        window.location.pathname = path
      }
      break
    }
    case 403: {
      window.location.pathname = "/403"
      break
    }
    case 500: {
      window.location.pathname = "/500"
      break
    }
    default: {
      if (status >= 500) {
        window.location.pathname = "/500"
        break
      }
      commonBillingErrorHandler(response)
      break
    }
  }
  return Promise.reject(error)
}
