import { getILLABuilderURL, removeAuthToken } from "@illa-public/utils"
import { AxiosError } from "axios"
import { cloudRedirect } from "@/router/constant"
import { commonBillingErrorHandler } from "@/utils/billing/errorHandler"

export const errorHandlerInterceptor = (error: AxiosError) => {
  const { response } = error
  if (!response) return Promise.reject(error)
  const { status } = response
  switch (status) {
    // TODO: @aruseito maybe need custom error status, because of we'll have plugin to request other's api
    case 401: {
      removeAuthToken()
      window.location.href = cloudRedirect
      break
    }
    case 403: {
      window.location.href = `${getILLABuilderURL()}/403`
      break
    }
    case 500: {
      window.location.href = `${getILLABuilderURL()}/500`
      break
    }
    default: {
      if (status >= 500) {
        window.location.href = `${getILLABuilderURL()}/500`
        break
      }
      commonBillingErrorHandler(response)
      break
    }
  }
  return Promise.reject(error)
}
