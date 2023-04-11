import { fromByteArray, toByteArray } from "base64-js"
import { read, utils } from "xlsx"
import { UploadItem, createMessage } from "@illa-design/react"
import i18n from "@/i18n/config"

const MAX_SIZE = 500 * 1024 * 1024
const EDGE_SIZE = 20 * 1024 * 1024

type ValueType = Array<{ status: string; value: any }>

export const getFileParsedValue = (file: UploadItem) =>
  new Promise((resolve, reject) => {
    const parsedFileType = ["txt", "json", "xls", "xlsx", "csv", "tsv"]
    const reader = new FileReader()

    if (file.originFile) {
      const type = (
        (file.originFile.name || "").split(".")[1] || ""
      ).toLowerCase()
      if (!parsedFileType.includes(type)) {
        resolve(undefined)
      }
      if (["txt"].includes(type)) {
        reader.onload = () => {
          resolve(reader.result)
        }
        reader.readAsText(file.originFile)
      }
      if (["json"].includes(type)) {
        reader.onload = () => {
          const result = reader.result
          if (typeof result === "string") {
            resolve(JSON.parse(result))
          }
        }
        reader.readAsText(file.originFile)
      }
      if (["xls", "xlsx", "csv", "tsv"].includes(type)) {
        reader.readAsArrayBuffer(file.originFile)
        reader.onload = () => {
          const result = reader.result
          const wb = read(result)
          const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          resolve(data)
        }
      }
      reader.onerror = (error) => reject(error)
    } else {
      resolve(undefined)
    }
  })

function readAndConvertFileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const contentType = file.type
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer)
      const base64Str = fromByteArray(data)
      resolve(`data:${contentType};base64,${base64Str}`)
    }
    reader.onerror = (event) => {
      reject(event)
    }
    reader.readAsArrayBuffer(file)
  })
}

const parseSmallFile = (file: File) =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve(undefined)
    }
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })

export const toBase64 = async (file: UploadItem) => {
  if (!file?.originFile) {
    return undefined
  }
  try {
    const { size } = file.originFile
    if (size > MAX_SIZE) {
      return undefined
    }
    if (size > EDGE_SIZE) {
      return readAndConvertFileToBase64(file.originFile)
    }
    return parseSmallFile(file.originFile)
  } catch (error) {
    return undefined
  }
}

export const getFilteredValue = (values?: ValueType, type?: string) => {
  if (!values) {
    return
  }
  const filteredValue = values.filter(
    (data) => data.value !== undefined && data.status === "fulfilled",
  )
  const isBase64 = type === "base64"
  return filteredValue.map((data) =>
    isBase64 ? data.value.split(",")[1] : data.value,
  )
}

export const dataURLtoFile = (
  dataUrl: string,
  filetype: string,
  filename: string,
) => {
  return new File([toByteArray(dataUrl)], filename, { type: filetype })
}

export const getCurrentList = (fileList: UploadItem[]) => {
  if (!fileList || !fileList.length) {
    return
  }
  return fileList.map((file) => {
    const { originFile, ...others } = file
    return others
  })
}

export const getFilesInfo = (fileList: UploadItem[]) =>
  fileList.map((file) => ({
    lastModified: file.originFile?.lastModified,
    name: file.originFile?.name,
    size: file.originFile?.size,
    type: file.originFile?.type,
  })) || []

export const getFormattedFileList = async (
  fileList: UploadItem[],
  parseValue: boolean,
) => {
  const values = await Promise.allSettled(
    fileList.map(async (file) => await toBase64(file)),
  )
  let parsedValues
  if (parseValue) {
    parsedValues = await Promise.allSettled(
      fileList.map(async (file) => {
        return await getFileParsedValue(file)
      }),
    )
  }
  return {
    values,
    fileList,
    parsedValues,
  }
}

export const getIsAllFileDone = (fileList: UploadItem[]) =>
  fileList.every((file) => file.status === "done" || file.status === "error")

export const handleHasFileOversize = (
  previousFiles: UploadItem[],
  files: UploadItem[],
) => {
  const message = createMessage()
  if (files.length <= previousFiles.length) {
    return
  }
  const newFiles = [...files].slice(previousFiles.length)
  const hasOversizeFile = newFiles.some(
    (file) => (file.originFile?.size || 0) > MAX_SIZE,
  )
  if (hasOversizeFile) {
    message.error({
      content: i18n.t("editor.inspect.setter_message.upload.size_exceed"),
    })
  }
}
