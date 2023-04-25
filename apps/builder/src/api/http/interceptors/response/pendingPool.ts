import { AxiosResponse } from "axios"
import { removeRequestPendingPool } from "@/api/http/utils/axiosPendingPool"

export const removeFromPendingPoolInterceptor = (response: AxiosResponse) => {
  const { config } = response
  removeRequestPendingPool(config)
  return response
}
