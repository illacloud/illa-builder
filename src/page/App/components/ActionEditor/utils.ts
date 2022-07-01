import i18n from "@/i18n/config"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { isAlreadyGenerate } from "@/redux/currentApp/displayName/displayNameReducer"
import { ActionDisplayNameGenerator } from "@/utils/generators/generateActionDisplayName"
import { isValidDisplayName } from "@/utils/typeHelper"
import { ActionDisplayNameValidateResult } from "./interface"

export function useIsValidActionDisplayName() {
  const actionList = useSelector(selectAllActionItem)
  const displayNameSet = useMemo(() => {
    return new Set(actionList.map(({ displayName }) => displayName))
  }, [actionList])

  function isValidActionDisplayName(
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
    if (
      displayNameSet.has(name) ||
      isAlreadyGenerate({
        type: ActionDisplayNameGenerator.DISPLAY_NAME_TYPE,
        displayName: name,
      })
    ) {
      return {
        error: true,
        errorMsg: i18n.t(
          "editor.action.action_list.message.name_already_exist",
        ),
      }
    }

    return { error: false }
  }

  return {
    isValidActionDisplayName,
  }
}
