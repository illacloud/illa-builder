import Axios from "axios"
import download from "downloadjs"
import XLSX from "xlsx"
import { isArray, isObject } from "@illa-design/react"
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
  const passData = isArray(data)
    ? data.map((item) => (isObject(item) ? item : { value: item }))
    : isObject(data)
    ? [data]
    : [{ value: data }]
  const skipHeader = !(isArray(data) || isObject(data))
  const worksheet = XLSX.utils.json_to_sheet(passData)
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
  return XLSX.write(workbook, { type: "buffer", bookType })
}

const convertToCSV = (data: any): string => {
  if (Array.isArray(data)) {
    const rows = data.map((row) => convertToCSV(row))
    return rows.join("\n")
  } else if (typeof data === "object" && data !== null) {
    const keys = Object.keys(data)
    const header = keys.map((key) => `${key}`).join(",")
    const values = keys.map((key) => data[key])
    const row = values.map((value: any) => convertToCSV(value)).join(",")
    return `${header}\n${row}`
  } else {
    return `${data}`
  }
}

function toTsv(data: any): string {
  if (Array.isArray(data)) {
    const headers = Object.keys(data[0]).join("\t")
    const rows = data.map((obj) => Object.values(obj).join("\t"))
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
  try {
    const fileDownloadName = getFileName((fileName ?? "").trim(), fileType)
    const contentType = getContentTypeByFileExtension(
      fileDownloadName.split(".")[1],
    )
    const isBase64Suffix = typeof data === "string" && isBase64(data)
    const isValidBase64 = typeof data === "string" && isBase64(data, true)

    let params

    if (isValidBase64) {
      params = data
    } else if (isBase64Suffix) {
      params = `data:${contentType};base64,${data}`
    } else if (data instanceof Blob) {
      params = data
    } else if (isUrl(data)) {
      const res = await Axios.get(data)
      params = await res.data.blob()
    } else {
      switch (contentType) {
        case "text/csv":
          params = new Blob(["\ufeff", convertToCSV(data)], {
            type: "text/csv;charset=utf-8",
          })
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
          params = isObject(data) ? JSON.stringify(data) : String(data)
          break
      }
    }
    console.log({ params, fileDownloadName, contentType })
    download(params, fileDownloadName, contentType)
  } catch (e) {
    console.error(e)
  }
}
