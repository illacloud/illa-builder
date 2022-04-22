import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { parseObjectToQueryParams } from "./utils"
import {
  apiSuccessResponseInterceptor,
  apiFailureResponseInterceptor,
} from "./interceptor"

const defaultConfig: Partial<AxiosRequestConfig> = {}
const axiosInstance: AxiosInstance = axios.create(defaultConfig)

axiosInstance.interceptors.response.use(
  apiSuccessResponseInterceptor,
  apiFailureResponseInterceptor,
)

export default class Api {
  static get(
    url: string,
    queryParams?: object,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axiosInstance.get(
      url + parseObjectToQueryParams(queryParams),
      config,
    )
  }

  static post(
    url: string,
    body?: object,
    queryParams?: object,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axiosInstance.post(
      url + parseObjectToQueryParams(queryParams),
      body,
      config,
    )
  }

  static put(
    url: string,
    body?: object,
    queryParams?: object,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axiosInstance.put(
      url + parseObjectToQueryParams(queryParams),
      body,
      config,
    )
  }

  static delete(
    url: string,
    queryParams?: object,
    config: Partial<AxiosRequestConfig> = {},
  ) {
    return axiosInstance.delete(
      url + parseObjectToQueryParams(queryParams),
      config,
    )
  }
}
