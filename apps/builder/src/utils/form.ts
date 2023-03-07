import i18n from "@/i18n/config"
import { isURL } from "@/utils/typeHelper"

export const validate = (value?: string) =>
  value != undefined && value.trim() != ""

export const isContainLocalPath = (value: string) => {
  const lowercaseValue = (value ?? "").toLowerCase()
  return (
    lowercaseValue.includes("localhost") || lowercaseValue.includes("127.0.0.1")
  )
}

export const urlValidate = (value: string) => {
  return isURL(value)
    ? true
    : i18n.t("editor.action.resource.error.invalid_url")
}
