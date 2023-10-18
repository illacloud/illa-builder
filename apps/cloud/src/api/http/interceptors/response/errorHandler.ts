import { removeAuthToken } from "@illa-public/utils"
import { AxiosError } from "axios"

export const errorHandlerInterceptor = (error: AxiosError) => {
  const { response } = error
  if (!response) {
    return Promise.reject(error)
  }

  const { status } = response
  switch (status) {
    case 401: {
      removeAuthToken()
      window.location.pathname = "/login"
      break
    }
    default: {
      // throw new Response(message, { status: status })
    }
  }
  return Promise.reject(error)
}
