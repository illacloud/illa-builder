import { FC, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { omit } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem"
import { hiddenFields } from "@/page/App/components/DataWorkspace/constant"
import { getSelectedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getActionExecutionResultArray } from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"

export const ActionSpaceTree: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const actionExecutionArray = useSelector(getActionExecutionResultArray)
  const actionList = useSelector(getActionList)
  const selectedAction = useSelector(getSelectedAction)

  const handleActionSelect = useCallback(
    (selectedKeys: string[]) => {
      const action = actionList.find(
        (item) => item.displayName === selectedKeys[0],
      )
      action && dispatch(configActions.changeSelectedAction(action))
    },
    [actionList, dispatch],
  )

  return (
    <PanelBar
      title={`${t("editor.data_work_space.actions_title")}(${
        actionExecutionArray.length
      })`}
      onIllaFocus={() => {
        FocusManager.switchFocus("data_action")
      }}
      destroyChildrenWhenClose
    >
      {actionExecutionArray.map((data) => (
        <WorkSpaceTreeItem
          key={data.displayName}
          title={data.displayName}
          data={omit(data, hiddenFields)}
          handleSelect={handleActionSelect}
          level={0}
          isSelected={selectedAction?.displayName === data.displayName}
          parentKey={data.displayName}
        />
      ))}
    </PanelBar>
  )
}

ActionSpaceTree.displayName = "ActionSpaceTree"
