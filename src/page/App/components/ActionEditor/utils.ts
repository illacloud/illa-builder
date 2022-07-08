import i18n from "@/i18n/config"
import { isAlreadyGenerate } from "@/redux/currentApp/displayName/displayNameReducer"
import { isValidDisplayName } from "@/utils/typeHelper"
import { ActionDisplayNameValidateResult } from "./interface"

export function isValidActionDisplayName(
  name: string,
): ActionDisplayNameValidateResult {
  if (name === "") {
    return {
      error: true,
      errorMsg: i18n.t("editor.action.action_list.message.please_input_name"),
    }
  }

  if (!isValidDisplayName(name)) {
    return {
      error: true,
      errorMsg: i18n.t("editor.action.action_list.message.valid_name"),
    }
  }

  // check if unique in all actions and cache map
  if (isAlreadyGenerate(name)) {
    return {
      error: true,
      errorMsg: i18n.t("editor.action.action_list.message.name_already_exist"),
    }
  }

  return { error: false }
}
