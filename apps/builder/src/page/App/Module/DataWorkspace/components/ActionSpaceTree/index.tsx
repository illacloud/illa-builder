import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { PanelBar } from "@/components/PanelBar"
import { getSelectedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getActionExecutionResultWithOutIgnoreKey } from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { BaseDataItem } from "../BaseDataItem"

export const ActionSpaceTree: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const actionExecution = useSelector(getActionExecutionResultWithOutIgnoreKey)
  const actionList = useSelector(getActionList)
  const selectedAction = useSelector(getSelectedAction)

  const handleActionSelect = useCallback(
    (selectedKey: string) => {
      const action = actionList.find((item) => item.displayName === selectedKey)
      action && dispatch(configActions.changeSelectedAction(action))
    },
    [actionList, dispatch],
  )

  return (
    <PanelBar
      title={`${t("editor.data_work_space.actions_title")}(${
        Object.keys(actionExecution).length
      })`}
      onIllaFocus={() => {
        FocusManager.switchFocus("data_action")
      }}
      destroyChildrenWhenClose
    >
      {Object.keys(actionExecution).map((actionDisplayName) => (
        <BaseDataItem
          key={actionDisplayName}
          title={actionDisplayName}
          level={0}
          value={actionExecution[actionDisplayName] as Record<string, unknown>}
          haveMoreAction
          selectedDisplayNames={[selectedAction?.displayName ?? ""]}
          onClick={handleActionSelect}
          dataType="action"
          type={
            (actionExecution[actionDisplayName] as Record<string, unknown>)
              .actionType as string
          }
        />
      ))}
    </PanelBar>
  )
}

ActionSpaceTree.displayName = "ActionSpaceTree"
