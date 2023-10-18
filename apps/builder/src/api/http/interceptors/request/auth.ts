import { getAuthToken } from "@illa-public/utils"
import { AxiosRequestConfig } from "axios"

export const authInterceptor = (config: AxiosRequestConfig) => {
  const token = getAuthToken()
  if (typeof token === "string") {
    config.headers = {
      Authorization: token,
      ...(config.headers ?? {}),
    }
  }
  return config
}
