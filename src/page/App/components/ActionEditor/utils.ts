import i18n from "@/i18n/config"
import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
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
    if (displayNameSet.has(name)) {
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
