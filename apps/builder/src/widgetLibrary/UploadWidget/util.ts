import { UploadItem } from "@illa-design/react"
import { handleParseFile } from "@/utils/file"

export const getFileString = (file: UploadItem) =>
  new Promise((resolve, reject) => {
    const originFile = file.originFile
    if (originFile) {
      handleParseFile(originFile)
        .then((data) => {
          // TODO: WFT, dynamic bug
          resolve(data.replaceAll("{{", "{ {").replaceAll("}}", "} }"))
        })
        .catch(() => {
          reject()
        })
    } else {
      resolve(undefined)
    }
  })

export const toBase64 = (file: UploadItem) =>
  new Promise((resolve, reject) => {
    if (!file) {
      resolve(undefined)
    }
    const reader = new FileReader()
    if (file.originFile) {
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(file.originFile)
    } else {
      resolve(undefined)
    }
  })

type ValueType = Array<{ status: string; value: any }>

export const getFilteredValue = (values?: ValueType, type?: string) => {
  if (!values) {
    return
  }
  const filteredValue = values.filter(
    (data) => data.value !== undefined && data.status === "fulfilled",
  )
  if (filteredValue && filteredValue.length > 0) {
    const isBase64 = type === "base64"
    return filteredValue.map((data) =>
      isBase64 ? data.value.split(",")[1] : data.value,
    )
  }
  return []
}

export const dataURLtoFile = (dataurl: string, filename: string) => {
  const arr = dataurl.split(",")
  const mime = arr[0].match(/:(.*?);/)?.[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
