import { Zip, ZipPassThrough } from "fflate"
import { createWriteStream } from "streamsaver"
import { createMessage } from "@illa-design/react"
import { fetchDownloadURLByTinyURL } from "@/services/drive-keep"
import { isILLAAPiError } from "@/utils/typeHelper"

const message = createMessage()

interface IDriveDownloadInfo {
  tinyURL: string
  fileID: string
}

interface IDownloadFromILLADriveParams {
  downloadInfo: IDriveDownloadInfo[]
  asZip?: boolean
}
export const downloadFromILLADrive = async (
  params: IDownloadFromILLADriveParams,
) => {
  const { downloadInfo, asZip = false } = params
  if (!Array.isArray(downloadInfo)) {
    return
  }
  let promise = Promise.resolve()
  const zip = new Zip()

  const zipName = `illa_drive_download_${new Date().getTime()}.zip`
  const zipReadableStream = new ReadableStream({
    start(controller) {
      zip.ondata = (error, data, final) => {
        if (error) {
          controller.error(error)
        } else {
          controller.enqueue(data)
          if (final) {
            controller.close()
          }
        }
      }
    },
  })
  if (asZip) {
    const streamsaver = createWriteStream(zipName)
    zipReadableStream.pipeTo(streamsaver)
  }

  for (let i = 0; i < downloadInfo.length; i++) {
    const { tinyURL, fileID } = downloadInfo[i]
    promise = promise.then(async () => {
      try {
        const response = await fetchDownloadURLByTinyURL(tinyURL, fileID)
        const fileInfo = response.data
        const { name, downloadURL } = fileInfo
        const fileResponse = await fetch(downloadURL)

        if (!asZip && window.WritableStream && fileResponse.body?.pipeTo) {
          const fileStream = createWriteStream(name)
          return fileResponse.body.pipeTo(fileStream)
        }

        if (asZip) {
          const zipStream = new ZipPassThrough(name)
          zip.add(zipStream)
          const fileReader = fileResponse.body?.getReader()

          while (fileReader) {
            const { value, done } = await fileReader.read()
            if (done) {
              zipStream.push(new Uint8Array(0), true)
              return Promise.resolve()
            }
            zipStream.push(value)
          }
        }
      } catch (e) {
        if (isILLAAPiError(e)) {
          if (e.data.errorMessage === "ERROR_FLAG_OUT_OF_USAGE_TRAFFIC") {
            message.error({
              content: "流量不足，下载失败", // TODO: i18n
            })
            return Promise.reject(e)
          }
        }
        return Promise.resolve()
      }
    })
  }

  if (asZip) {
    promise.then(() => {
      zip.end()
    })
  }
}
