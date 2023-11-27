import {
  ActionContent,
  ILLADriveAction,
  ILLADriveActionTypeContent,
} from "@illa-public/public-types"
import { ActionType } from "@illa-public/public-types"
import { AxiosResponse } from "axios"
import { isClientS3ActionContent } from "@/utils/typeHelper"
import { transformDriveResFormat } from "./driveActions"

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
  actionContent: ActionContent,
  response: AxiosResponse,
) => {
  switch (actionType) {
    case "s3": {
      const isClientS3 = isClientS3ActionContent(actionType, actionContent)
      if (isClientS3) {
        return transClientS3Response(response)
      } else {
        return {
          data: response.data.Rows,
        }
      }
    }
    case "restapi":
    case "huggingface":
    case "hfendpoint": {
      return transLikeRestApiResponse(response)
    }
    case "graphql": {
      return {
        data: response.data.Rows?.[0],
      }
    }
    case "illadrive": {
      return transformDriveResFormat(
        response,
        actionContent as ILLADriveAction<ILLADriveActionTypeContent>,
      )
    }
    default: {
      return {
        data: response.data.Rows,
      }
    }
  }
}
