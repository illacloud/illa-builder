import download from "downloadjs"
import XLSX from "xlsx"
import { createMessage, isArray, isObject } from "@illa-design/react"
import { Api } from "@/api/base"
import { isUrl } from "@/utils/url"
import { isBase64 } from "@/utils/url/base64"

export const calculateFileSize = (data: string | string[]) => {
  const blobArr = Array.isArray(data) ? data : [data]
  return new Blob(blobArr).size
}

export const isValidBase64 = (str: string) => {
  try {
    window.atob(str)
    return true
  } catch (e) {
    return false
  }
}

export const downloadSingleFile = (
  contentType: string,
  fileName: string,
  data: BlobPart,
) => {
  const isBase64 = typeof data === "string" ? isValidBase64(data) : false
  const isDownloadBase64 = isBase64 && !!contentType
  let href = ""
  if (!isDownloadBase64) {
    const blob = new Blob([data], { type: contentType })
    href = URL.createObjectURL(blob)
  }
  const a = document.createElement("a")
  a.download = fileName
  a.style.display = "none"
  a.href = isDownloadBase64 ? `data:${contentType};base64,${data}` : href
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const FILE_EXTENSION_TO_CONTENT_TYPE_MAP = {
  // Images
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  bmp: "image/bmp",
  svg: "image/svg+xml",
  webp: "image/webp",
  ico: "image/x-icon",

  // Audio
  mp3: "audio/mpeg",
  wav: "audio/wav",
  ogg: "audio/ogg",
  mid: "audio/midi",

  // Video
  mp4: "video/mp4",
  avi: "video/x-msvideo",
  mpeg: "video/mpeg",
  mov: "video/quicktime",
  webm: "video/webm",

  // Text
  txt: "text/plain",
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
  json: "application/json",
  xml: "application/xml",

  // Documents
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  // Data
  csv: "text/csv",
  tsv: "text/tab-separated-values",
  zip: "application/zip",
  gzip: "application/gzip",
}

export const getContentTypeByFileExtension = (extension: string) => {
  return (
    FILE_EXTENSION_TO_CONTENT_TYPE_MAP[
      (
        extension ?? ""
      ).toLowerCase() as keyof typeof FILE_EXTENSION_TO_CONTENT_TYPE_MAP
    ] || "application/octet-stream"
  )
}

const downloadExcelFile = (data: any, contentType: string) => {
  const bookType =
    contentType ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ? "xlsx"
      : "xls"

  const workbook = XLSX.utils.book_new()
  const sheetName = "Sheet1"

  let isObjectItem = true

  let passData
  if (isArray(data)) {
    isObjectItem = data.every((item) => isObject(item) || isArray(item))
    if (isObjectItem) {
      passData = data.map((item) => convertObj(item, false, true))
    } else {
      passData = [
        {
          value: JSON.stringify(data),
        },
      ]
    }
  } else if (isObject(data)) {
    passData = [convertObj(data, false, true)]
  } else {
    passData = [{ value: data }]
  }
  const skipHeader = !((isArray(data) && isObjectItem) || isObject(data))
  const worksheet = XLSX.utils.json_to_sheet(passData, {
    skipHeader,
  })
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  return XLSX.write(workbook, { type: "buffer", bookType })
}

const convertObj = (
  obj: any,
  format?: boolean,
  objFormat: boolean = false,
): any => {
  if (isArray(obj)) {
    return `[${obj.map((item) => convertObj(item))}]`
  }
  if (isObject(obj)) {
    const newObj: any = {}
    Object.keys(obj).forEach((key) => {
      newObj[key] = convertObj(obj[key], objFormat)
    })
    return format ? JSON.stringify(newObj) : newObj
  }
  return obj
}

const convertToCSV = (data: any): string => {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return ""
    }
    const firstRow = data[0]
    const keys = Object.keys(firstRow)
    const header = keys.map((key) => `${key}`).join(",")
    const rows = data.map((row) => convertToCSV(row))
    return `${header}\n${rows.join("\n")}`
  } else if (typeof data === "object" && data !== null) {
    const values = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key]
        if (typeof value === "object" && !Array.isArray(value)) {
          values.push(`"${convertObj(value, true).replace(/"/g, '""')}"`)
        } else if (Array.isArray(value)) {
          values.push(`"[${value.join(" , ").replace(/"/g, '""')}]"`)
        } else {
          values.push(value)
        }
      }
    }
    return values.join(",")
  } else {
    return `${data}`
  }
}

function toTsv(data: any): string {
  if (isArray(data)) {
    const headers = Object.keys(data[0]).join("\t")
    const rows = data.map((obj) =>
      Object.values(obj)
        .map((val) => (isObject(val) ? JSON.stringify(val) : val))
        .join("\t"),
    )
    return [headers, ...rows].join("\n")
  } else if (typeof data === "object" && data !== null) {
    return Object.values(data).map(toTsv).join("\t")
  } else {
    return String(data)
  }
}

const getFileName = (fileName: string, fileType: string) => {
  const fileRealName = !fileName ? "download" : fileName.split(".")[0]
  const fileExtension = fileName.split(".")[1]

  if (fileExtension) {
    return `${fileRealName}.${fileExtension}`
  } else {
    if (fileType !== "auto") {
      return `${fileRealName}.${fileType}`
    } else {
      return `${fileRealName}`
    }
  }
}

export const downloadFileFromEventHandler = async (
  fileType: string,
  fileName: string,
  data: any,
) => {
  const message = createMessage()
  try {
    message.info({
      content: "文件下载中...",
    })

    const fileDownloadName = getFileName((fileName ?? "").trim(), fileType)
    const contentType = getContentTypeByFileExtension(
      fileDownloadName.split(".")[1],
    )
    const isBase64Suffix = typeof data === "string" && isBase64(data)
    const isValidBase64 = typeof data === "string" && isBase64(data, true)

    let params

    if (isValidBase64 || data instanceof Blob) {
      params = data
    } else if (isBase64Suffix) {
      params = `data:${contentType};base64,${data}`
    } else if (isUrl(data)) {
      try {
        const res = await Api.asyncCustomRequest<Blob>({
          url: data,
          method: "GET",
          responseType: "blob",
        })
        params = await res.data
      } catch (e) {
        message.error({
          content: "文件下载失败",
        })
        return
      }
    } else {
      switch (contentType) {
        case "text/csv":
          params = new Blob(
            [
              "\ufeff",
              convertToCSV(
                isArray(data) ? data : isObject(data) ? [data] : data,
              ),
            ],
            {
              type: "text/csv;charset=utf-8",
            },
          )
          break
        case "application/vnd.ms-excel":
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          {
            params = new Blob([downloadExcelFile(data, contentType)], {
              type: "application/octet-stream",
            })
          }
          break
        case "text/tab-separated-values":
          params = toTsv(data)
          break
        default:
          {
            if (typeof data === "object") {
              params = JSON.stringify(data)
            } else {
              params = data
            }
          }
          break
      }
    }
    download(params, fileDownloadName, contentType)
  } catch (e) {
    message.error({
      content: "文件下载失败",
    })
    console.error(e)
  }
}
