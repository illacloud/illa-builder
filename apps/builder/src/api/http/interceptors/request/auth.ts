import { AxiosRequestConfig } from "axios"
import { getAuthToken } from "@/utils/auth"

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
