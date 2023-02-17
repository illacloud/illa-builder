import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import {
  addRequestPendingPool,
  removeRequestPendingPool,
} from "@/api/helpers/axiosPendingPool"
import { ILLARoute } from "@/router"
import { cloudUrl } from "@/router/routerConfig"
import { getAuthToken, removeAuthToken } from "@/utils/auth"
import { isCloudVersion } from "@/utils/typeHelper"

const CLOUD = "/supervisor/api/v1"

const cloudAxios = Axios.create({
  baseURL: `${location.protocol}//${import.meta.env.VITE_API_BASE_URL}${CLOUD}`,
  timeout: 10000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

const authInterceptor = (config: AxiosRequestConfig) => {
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

const fullFillInterceptor = (response: AxiosResponse) => {
  const { config } = response
  removeRequestPendingPool(config)
  return response
}

const axiosErrorInterceptor = (error: AxiosError) => {
  const { response } = error
  if (!response) return Promise.reject(error)
  const { status } = response
  switch (status) {
    // TODO: @aruseito maybe need custom error status, because of we'll have plugin to request other's api
    case 401: {
      removeAuthToken()
      if (isCloudVersion) {
        // navigate to illa cloud
        ILLARoute.navigate(cloudUrl)
      } else {
        const { pathname } = location
        ILLARoute.navigate("/user/login", {
          replace: true,
          state: {
            form: pathname || "/",
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
  }
  return Promise.reject(error)
}

cloudAxios.interceptors.request.use(authInterceptor, (err) => {
  return Promise.reject(err)
})

cloudAxios.interceptors.response.use(fullFillInterceptor, axiosErrorInterceptor)
