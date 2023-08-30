import { ILLAApiError } from "@illa-public/illa-net"
import { AxiosResponse } from "axios"
import { S3ActionRequestType } from "@/redux/currentApp/action/s3Action"
import { fetchS3ActionRunResult } from "@/services/action"
import { downloadSingleFile } from "@/utils/file"

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
      Authorization: "",
    }
    let result
    const { commands } = actionContent
    switch (commands) {
      case S3ActionRequestType.READ_ONE:
        const readURL = urlInfos[0].url
        const response = await fetchS3ActionRunResult(readURL, "GET", headers)
        result = response
        break
      case S3ActionRequestType.DOWNLOAD_ONE:
        const url = urlInfos[0].url
        let downloadCommandArgs = actionContent.commandArgs
        const downloadResponse = await fetchS3ActionRunResult(
          url,
          "GET",
          headers,
        )
        const contentType =
          downloadResponse.headers["content-type"].split(";")[0] ?? ""
        downloadSingleFile(
          contentType,
          downloadCommandArgs.objectKey,
          downloadResponse.data || "",
        )
        result = downloadResponse
        break
      case S3ActionRequestType.UPLOAD: {
        let uploadCommandArgs = actionContent.commandArgs
        const uploadUrl = urlInfos[0].url
        const uploadResponse = await fetchS3ActionRunResult(
          uploadUrl,
          "PUT",
          {
            ...headers,
            "x-amz-acl": urlInfos[0].acl ?? "public-read",
          },
          uploadCommandArgs.objectData,
        )
        result = uploadResponse
        break
      }
      case S3ActionRequestType.UPLOAD_MULTIPLE: {
        const multipleCommandArgs = actionContent.commandArgs
        const { objectDataList } = multipleCommandArgs
        let requests: Promise<AxiosResponse<BlobPart, unknown>>[] = []
        urlInfos.forEach((data, index) => {
          requests.push(
            fetchS3ActionRunResult(
              data.url,
              "PUT",
              {
                ...headers,
                "x-amz-acl": data.acl ?? "public-read",
              },
              objectDataList[index],
            ),
          )
        })
        const uploadMultipleCommandResponse = await Promise.allSettled(requests)
        result = uploadMultipleCommandResponse.map((res) => {
          if (res.status === "fulfilled") {
            return res.value
          }
          return res.reason as AxiosResponse<ILLAApiError>
        })
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
