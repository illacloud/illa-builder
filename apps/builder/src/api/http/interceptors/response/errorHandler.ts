import { AxiosError } from "axios"
import { ILLARoute } from "@/router"
import { cloudRedirect } from "@/router/constant"
import { getQS } from "@/router/utils/translateQS"
import { removeAuthToken } from "@/utils/auth"
import { isCloudVersion } from "@/utils/typeHelper"

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
  const { pathname, href } = location
  const { status } = response
  switch (status) {
    // TODO: @aruseito maybe need custom error status, because of we'll have plugin to request other's api
    case 401: {
      removeAuthToken()
      if (isCloudVersion) {
        // navigate to illa cloud, avoid redirect loop
        if (!href.includes("redirectUrl")) {
          window.location.href = cloudRedirect
        }
      } else {
        const { href } = location
        const url = new URL(href)
        const searchParams = url.searchParams
        const path = getRedirectPathWhen401(searchParams)
        ILLARoute.navigate(`${path}`, {
          replace: true,
          state: {
            from: pathname || "/",
          },
        })
      }
      break
    }
    case 403: {
      ILLARoute.navigate("/403", {
        replace: true,
      })
      break
    }
    case 500: {
      ILLARoute.navigate("/500", {
        replace: true,
      })
      break
    }
    default: {
      if (status >= 500) {
        ILLARoute.navigate("/500", {
          replace: true,
        })
        break
      }
      break
    }
  }
  return Promise.reject(error)
}
