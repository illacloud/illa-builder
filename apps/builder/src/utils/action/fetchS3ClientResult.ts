import { S3ActionRequestType, S3_CONTENT_TYPE } from "@illa-public/public-types"
import { isFile } from "@illa-public/utils"
import { AxiosResponse } from "axios"
import { createWriteStream } from "streamsaver"
import { fetchS3ActionRunResult } from "@/services/action"
import { downloadSingleFile, getFileName } from "@/utils/file"
import { isBase64Simple } from "@/utils/url/base64"
import { dataURLtoFile } from "@/widgetLibrary/UploadWidget/util"

const getFileInfo = (fileName: string, fileData: string, fileType: string) => {
  const isBase64 = isBase64Simple(fileData)
  if (!isBase64) return fileData
  const fileDownloadName = getFileName((fileName ?? "").trim(), fileType)
  return dataURLtoFile(fileData, fileDownloadName)
}

const isFileType = (contentType: string) => {
  return contentType === S3_CONTENT_TYPE.BINARY || isFile(contentType)
}
const isSerializedText = (contentType: string) => {
  return [
    S3_CONTENT_TYPE.CSV,
    S3_CONTENT_TYPE.JSON,
    S3_CONTENT_TYPE.STRING,
  ].includes(contentType as S3_CONTENT_TYPE)
}
const fileToDataURL = async (blob: Blob) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(blob)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const fetchS3ClientResult = async (
  presignData: Record<string, any>[],
  actionContent: Record<string, any>,
) => {
  const urlInfos = presignData as { key: string; url: string; acl?: string }[]
  try {
    if (!urlInfos.length) {
      return Promise.reject("presignedURL is undefined")
    }
    const headers = {
      "Content-Encoding": "compress",
    }
    let result
    const { commands } = actionContent
    switch (commands) {
      case S3ActionRequestType.READ_ONE: {
        const readURL = urlInfos[0].url
        const response = await fetchS3ActionRunResult(readURL, "GET", headers)
        const contentType = response?.headers["content-type"]
        const data: Record<string, string | boolean> = {
          key: urlInfos[0]?.key,
          contentType,
          isJson: contentType === S3_CONTENT_TYPE.JSON,
        }
        if (actionContent.commandArgs?.signedURL) {
          data.signedURL = readURL
        } else {
          data.url = readURL
        }
        if (isSerializedText(contentType)) {
          data.body = response.data
        } else if (isFileType(contentType)) {
          const fileResponse = await fetch(readURL)
          let base64: unknown = ""
          if (fileResponse) {
            const blob = await fileResponse.blob()
            base64 = await fileToDataURL(blob)
            data.body = `${base64}`
          }
        } else {
          data.body = response.data
        }
        response.data = data
        result = response
        break
      }
      case S3ActionRequestType.DOWNLOAD_ONE: {
        const url = urlInfos[0].url
        let downloadCommandArgs = actionContent.commandArgs
        const downloadResponse = await fetchS3ActionRunResult(
          url,
          "GET",
          headers,
        )
        const contentType =
          downloadResponse.headers["content-type"].split(";")[0] ?? ""
        let data = downloadResponse.data
        if (contentType === S3_CONTENT_TYPE.JSON) {
          data = JSON.stringify(data)
        } else if (isSerializedText(contentType)) {
          data = `${data}`
        } else if (isFileType(contentType)) {
          const fileResponse = await fetch(url)
          if (window.WritableStream && fileResponse.body?.pipeTo) {
            const fileStream = createWriteStream(downloadCommandArgs.objectKey)
            await fileResponse.body.pipeTo(fileStream)
            downloadResponse.data = fileResponse.url
            result = downloadResponse
            return result
          }
        }
        downloadSingleFile(
          contentType,
          downloadCommandArgs.objectKey,
          data || "",
        )
        result = downloadResponse
        break
      }
      case S3ActionRequestType.UPLOAD: {
        let uploadCommandArgs = actionContent.commandArgs
        const { objectKey, contentType, objectData } = uploadCommandArgs || {}
        const uploadUrl = urlInfos[0].url
        const uploadResponse = await fetchS3ActionRunResult(
          uploadUrl,
          "PUT",
          {
            ...headers,
            "x-amz-acl": urlInfos[0].acl ?? "public-read",
            "Content-Type": contentType ?? S3_CONTENT_TYPE.STRING,
          },
          isFileType(contentType)
            ? getFileInfo(objectKey, objectData, contentType)
            : objectData,
        )
        result = uploadResponse
        break
      }
      case S3ActionRequestType.UPLOAD_MULTIPLE: {
        const multipleCommandArgs = actionContent.commandArgs
        const { objectDataList, objectKeyList, contentType } =
          multipleCommandArgs
        let requests: Promise<AxiosResponse<BlobPart, unknown>>[] = []
        const isFile = isFileType(contentType)
        urlInfos.forEach((data, index) => {
          requests.push(
            fetchS3ActionRunResult(
              data.url,
              "PUT",
              {
                ...headers,
                "x-amz-acl": data.acl ?? "public-read",
                "Content-Type": contentType ?? S3_CONTENT_TYPE.STRING,
              },
              isFile
                ? getFileInfo(
                    objectKeyList[index],
                    objectDataList[index],
                    contentType,
                  )
                : objectDataList[index],
            ),
          )
        })
        const uploadMultipleCommandResponse = await Promise.allSettled(requests)
        for (let i = 0; i < uploadMultipleCommandResponse.length; i++) {
          let res = uploadMultipleCommandResponse[i]
          if (res.status === "fulfilled") {
            result = res.value
          } else {
            result = res.reason
            break
          }
        }
        break
      }
      default: {
        throw new Error("not has method")
      }
    }
    return result
  } catch (e) {
    throw e
  }
}
