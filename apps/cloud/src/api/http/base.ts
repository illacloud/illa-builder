import { needAuthAxios } from "@illa-public/illa-net"
import { authInterceptor } from "./interceptors/request/auth"
import { errorHandlerInterceptor } from "./interceptors/response/errorHandler"

needAuthAxios.interceptors.request.use(authInterceptor)
needAuthAxios.interceptors.response.use(undefined, errorHandlerInterceptor)
