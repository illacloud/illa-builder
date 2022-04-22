import axios, { AxiosResponse } from "axios"
import {
  NOT_ONLINE,
  ERROR_500,
  ERROR_401,
  ERROR_404,
  createMessage,
} from "./messages"
import { API_STATUS_CODES } from "./constants"

/*
 *  Any status code that lie within the range of 2xx cause this function to trigger
 */
export function apiSuccessResponseInterceptor(response: AxiosResponse) {
  return response
}

/*
 * Any status codes that falls outside the range of 2xx cause this function to trigger
 *
 * Handling various failure scenarios
 */
export function apiFailureResponseInterceptor(error: any) {
  if (!window.navigator.onLine) {
    return Promise.reject({
      ...error,
      message: createMessage(NOT_ONLINE),
    })
  }

  if (axios.isCancel(error)) {
    return
  }

  if (error.response) {
    const { status } = error.response

    if (status === API_STATUS_CODES.SERVER_ERROR) {
      return Promise.reject({
        ...error,
        message: createMessage(ERROR_500),
      })
    }

    if (status === API_STATUS_CODES.REQUEST_NOT_AUTHORISED) {
      return Promise.reject({
        ...error,
        message: createMessage(ERROR_401),
      })
    }

    if (status === API_STATUS_CODES.REQUEST_NOT_FOUND) {
      return Promise.reject({
        ...error,
        message: createMessage(ERROR_404),
      })
    }
  } else if (error.request) {
    console.error(error.request)
  } else {
    console.error(error.message)
  }

  return Promise.resolve(error)
}
