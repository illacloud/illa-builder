import { FC, HTMLAttributes, useCallback } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { ComponentSpaceTree } from "@/page/App/components/DataWorkspace/components/ComponentSpaceTree"
import { WorkSpaceTree } from "@/page/App/components/DataWorkspace/components/WorkSpaceTree"
import { getSelectedAction } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getActionExecutionResultArray } from "@/redux/currentApp/executionTree/executionSelector"
import { getGlobalInfoExecutionResult } from "@/redux/currentUser/currentUserSelector"
import { FocusManager } from "@/utils/focusManager"
import { PageSpaceTree } from "./components/PageSpaceTree"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const actionList = useSelector(getActionList)
  const actionExecutionArray = useSelector(getActionExecutionResultArray)
  const globalInfoList = useSelector(getGlobalInfoExecutionResult)
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
    <div className={className}>
      <PageSpaceTree />
      <ComponentSpaceTree />
      <WorkSpaceTree
        title={`${t("editor.data_work_space.actions_title")}(${
          actionExecutionArray.length
        })`}
        dataList={actionExecutionArray}
        selectedKeys={[selectedAction?.displayName ?? ""]}
        handleSelect={handleActionSelect}
        onIllaFocus={() => {
          FocusManager.switchFocus("dataWorkspace_action")
        }}
      />
      <WorkSpaceTree
        title={`${t("editor.data_work_space.globals_title")}(${
          globalInfoList.length
        })`}
        dataList={globalInfoList}
      />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
