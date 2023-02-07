import { read, utils } from "xlsx"
import { UploadItem } from "@illa-design/react"

export const getFileString = (file: UploadItem) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    if (file.originFile) {
      const type = (
        (file.originFile.name || "").split(".")[1] || ""
      ).toLowerCase()
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
    }
  })

export const toBase64 = (file: UploadItem) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    if (file.originFile) {
      reader.readAsDataURL(file.originFile)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    }
  })
