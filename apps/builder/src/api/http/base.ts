// eslint-disable-next-line import/no-named-as-default
import Axios from "axios"
import { HTTP_REQUEST_PUBLIC_BASE_URL } from "./constant"
import { authInterceptor } from "./interceptors/request/auth"
import { errorHandlerInterceptor } from "./interceptors/response/errorHandler"

const notNeedAuthAxios = Axios.create({
  baseURL: HTTP_REQUEST_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Encoding": "gzip",
    "Content-Type": "application/json",
  },
})

const needAuthAxios = Axios.create({
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

needAuthAxios.interceptors.request.use(authInterceptor)
needAuthAxios.interceptors.response.use(undefined, errorHandlerInterceptor)

actionRuntimeAxios.interceptors.request.use(authInterceptor)

export { actionRuntimeAxios, notNeedAuthAxios, needAuthAxios }
