import { AxiosResponse } from "axios"
import { ActionType } from "@/redux/currentApp/action/actionState"
import {
  isClientS3ActionResponse,
  isDatabaseActionResponse,
  isGraphqlActionResponse,
  isLikeRestApiActionResponse,
  isS3MultiActionResponse,
  isServerS3ActionResponse,
} from "@/utils/typeHelper"

const transMaybeFileResponse = (
  header: Record<string, unknown>,
  raw: string,
) => {
  const contentType =
    (header["Content-Type"] as string)?.split(";")[0] ?? "text/plain"
  if (
    contentType.includes("video/") ||
    contentType.includes("audio/") ||
    contentType.includes("image/") ||
    contentType.includes("application/pdf")
  ) {
    return {
      responseHeaders: header,
      data: raw,
      fileData: {
        base64binary: raw,
        dataURI: `data:${contentType};base64,${raw}`,
        fileType: contentType,
      },
    }
  }
  let realData = raw
  try {
    const bytes = new Uint8Array(
      atob(raw)
        .split("")
        .map((char) => char.charCodeAt(0)),
    )
    realData = new TextDecoder().decode(bytes)
  } catch {
    return {
      responseHeaders: header,
      data: raw,
    }
  }

  try {
    const parsedValue = JSON.parse(realData)
    return {
      responseHeaders: header,
      data: parsedValue,
      rawData: realData,
    }
  } catch (e) {
    return {
      rawData: realData,
      responseHeaders: header,
      data: realData,
    }
  }
}

const transClientS3Response = (response: AxiosResponse) => {
  if (response.config.method === "get") {
    return {
      responseHeaders: response.headers,
      data: response.data,
    }
  }
  if (response.status >= 200 && response.status < 300) {
    return {
      responseHeaders: response.headers,
      data: "ok",
    }
  }
  if (response.status >= 400 && response.status < 600) {
    return {
      responseHeaders: response.headers,
      data: "failed",
    }
  }
  return {
    responseHeaders: response.headers,
    data: "unknown",
  }
}

const transLikeRestApiResponse = (response: AxiosResponse) => {
  const resData = response.data
  if (resData && resData.Extra && resData.Extra.raw) {
    const responseHeaders = resData.Extra.headers
    const raw = resData.Extra.raw
    let header: Record<string, unknown> = {}
    Object.keys(responseHeaders).forEach((key) => {
      header[key] = responseHeaders[key][0]
    })
    if (resData.Extra.statusCode) {
      header["statusCode"] = resData.Extra.statusCode
    }
    if (resData.Extra.statusText) {
      header["statusText"] = resData.Extra.statusText
    }
    return transMaybeFileResponse(header, raw)
  }
  return resData
}

export const transResponse = (
  actionType: ActionType,
  response: unknown,
  isClientS3: boolean,
) => {
  if (actionType === "s3") {
    if (isClientS3 && isClientS3ActionResponse(actionType, response)) {
      return transClientS3Response(response)
    }
    if (isClientS3 && isS3MultiActionResponse(actionType, response)) {
      let multiResponse: {
        responseHeaders: Record<string, unknown>[]
        data: unknown[]
      } = {
        responseHeaders: [],
        data: [],
      }
      return response.map((res) => {
        const { responseHeaders, data } = transClientS3Response(res)
        multiResponse.responseHeaders.push(responseHeaders)
        multiResponse.data.push(data)
      })
    }
    if (isServerS3ActionResponse(isClientS3, response)) {
      return {
        data: response.data.Rows,
      }
    }
  }
  if (isLikeRestApiActionResponse(actionType, response)) {
    return transLikeRestApiResponse(response)
  }
  if (isGraphqlActionResponse(actionType, response)) {
    return {
      data: response.data.Rows?.[0],
    }
  }
  if (isDatabaseActionResponse(actionType, response)) {
    return {
      data: response.data.Rows,
    }
  }
  return {
    data: response,
  }
}
