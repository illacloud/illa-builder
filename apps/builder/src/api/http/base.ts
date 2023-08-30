import { actionRuntimeAxios, needAuthAxios } from "@illa-public/illa-net/base"
import { authInterceptor } from "@/api/http/interceptors/request/auth"
import { errorHandlerInterceptor } from "@/api/http/interceptors/response/errorHandler"

needAuthAxios.interceptors.request.use(authInterceptor)
needAuthAxios.interceptors.response.use(undefined, errorHandlerInterceptor)

actionRuntimeAxios.interceptors.request.use(authInterceptor)
