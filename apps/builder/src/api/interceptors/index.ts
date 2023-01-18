import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import {
  addRequestPendingPool,
  removeRequestPendingPool,
} from "@/api/helpers/axiosPendingPool"
import { ILLARoute } from "@/router"
import { getAuthToken, removeAuthToken } from "@/utils/auth"

export const authInterceptor = (config: AxiosRequestConfig) => {
  addRequestPendingPool(config)
  const token = getAuthToken()
  if (typeof token === "string") {
    config.headers = {
      ...(config.headers ?? {}),
      Authorization: token,
    }
  }
  return config
}

export const fullFillInterceptor = (response: AxiosResponse) => {
  const { config } = response
  removeRequestPendingPool(config)
  return response
}

export const axiosErrorInterceptor = (error: AxiosError) => {
  const { response } = error
  if (!response) return Promise.reject(error)
  const { status } = response
  switch (status) {
    // TODO: @aruseito maybe need custom error status, because of we'll have plugin to request other's api
    case 401: {
      removeAuthToken()
      const { pathname } = location
      ILLARoute.navigate("/login", {
        replace: true,
        state: {
          form: pathname || "/",
        },
      })
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
  }
  return Promise.reject(error)
}
