// eslint-disable-next-line import/no-named-as-default
import Axios from "axios"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "./constant"
import { authInterceptor } from "./interceptors/request/auth"
import { addToPendingPoolInterceptor } from "./interceptors/request/pendingPool"
import { errorHandlerInterceptor } from "./interceptors/response/errorHandler"
import { removeFromPendingPoolInterceptor } from "./interceptors/response/pendingPool"

const basicAxios = Axios.create({
  baseURL: HTTP_REQUEST_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

const actionRuntimeAxios = Axios.create({
  baseURL: HTTP_REQUEST_PUBLIC_BASE_URL,
  timeout: 600000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

basicAxios.interceptors.request.use(addToPendingPoolInterceptor)
basicAxios.interceptors.request.use(authInterceptor)
basicAxios.interceptors.response.use(
  removeFromPendingPoolInterceptor,
  errorHandlerInterceptor,
)

actionRuntimeAxios.interceptors.request.use(addToPendingPoolInterceptor)
actionRuntimeAxios.interceptors.request.use(authInterceptor)
actionRuntimeAxios.interceptors.response.use(removeFromPendingPoolInterceptor)

export { basicAxios, actionRuntimeAxios }
