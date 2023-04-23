import { AxiosRequestConfig } from "axios"
import { addRequestPendingPool } from "@/api/http/utils/axiosPendingPool"

export const addToPendingPoolInterceptor = (config: AxiosRequestConfig) => {
  addRequestPendingPool(config)
  return config
}
