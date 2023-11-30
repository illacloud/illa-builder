import XLSX from "xlsx"
import { createMessage, isArray, isObject } from "@illa-design/react"
import i18n from "@/i18n/config"
import { fetchDownloadFileFromURL } from "@/services/action"
import { downloadFile } from "../eventHandlerHelper/utils/commonUtils"

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

export const getFileExtensionFromBase64 = (base64: string) => {
  return base64.split(";")[0].split("/")[1]
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
  epub: "application/epub+zip",
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

export const downloadExcelFile = (data: any, contentType: string) => {
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
      passData = data.map((item) => convertObj(item, false))
    } else {
      passData = [
        {
          value: JSON.stringify(data),
        },
      ]
    }
  } else if (isObject(data)) {
    passData = [convertObj(data, false)]
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

const convertObj = (obj: any, format?: boolean): any => {
  if (isArray(obj)) {
    return `[${obj.map((item) => convertObj(item, true))}]`
  }
  if (isObject(obj)) {
    const newObj: any = {}
    Object.keys(obj).forEach((key) => {
      newObj[key] = convertObj(obj[key], true)
    })
    return format ? JSON.stringify(newObj) : newObj
  }
  return obj
}

export const convertToCSV = (data: any): string => {
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
          values.push(
            `"[${value
              .map((item) => convertObj(item, true))
              .join(" , ")
              .replace(/"/g, '""')}]"`,
          )
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

export const convertToTSV = (data: any): string => {
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return ""
    }
    const firstRow = data[0]
    const keys = Object.keys(firstRow)
    const header = keys.join("\t")
    const rows = data.map((row) => convertToTSV(row))
    return `${header}\n${rows.join("\n")}`
  } else if (typeof data === "object" && data !== null) {
    const values = []
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key]
        if (typeof value === "object" && !Array.isArray(value)) {
          values.push(`"${convertObj(value, true).replace(/"/g, '""')}"`)
        } else if (Array.isArray(value)) {
          values.push(
            `"[${value
              .map((item) => convertObj(item, true))
              .join(", ")
              .replace(/"/g, '""')}]"`,
          )
        } else {
          values.push(value)
        }
      }
    }
    return values.join("\t")
  } else {
    return `${data}`
  }
}

export const getFileName = (fileName: string, fileType: string) => {
  const namePart = fileName.split(".")
  const length = namePart.length
  const fileRealName =
    (!fileName
      ? "download"
      : length > 1
        ? namePart.slice(0, -1).join(".")
        : namePart[0]) || "download"
  const fileExtension = length > 1 ? namePart[length - 1] : ""

  if (fileExtension) {
    return `${fileRealName}.${fileExtension}`
  }

  if (fileType !== "auto") {
    return `${fileRealName}.${fileType}`
  }

  return `${fileRealName}`
}

export const downloadFileFromURL = async (
  data: string,
  fileDownloadName: string,
  contentType: string,
) => {
  const message = createMessage()
  try {
    const res = await fetchDownloadFileFromURL(data)
    downloadFile({
      fileType: contentType,
      fileName: fileDownloadName,
      data: res,
    })
    return
  } catch (e) {
    message.error({
      content: i18n.t("editor.method.file_download.message.fail"),
    })
    return
  }
}

export const base642Blob = async (base64: string) => {
  const result = await fetch(base64)
  return result.blob()
}
