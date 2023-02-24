import i18n from "@/i18n/config"
import { isURL } from "@/utils/typeHelper"

export const validate = (value?: string) =>
  value != undefined && value.trim() != ""

export const urlValidate = (value: string) => {
  return isURL(value)
    ? true
    : i18n.t("editor.action.resource.error.invalid_url")
}
