import { FC, HTMLAttributes, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getActionExecutionResultArray,
  getWidgetExecutionResultArray,
} from "@/redux/currentApp/executionTree/executionSelector"
import {
  getSelectedAction,
  getSelectedComponentsDisplayName,
} from "@/redux/config/configSelector"
import { WorkSpaceTree } from "@/page/App/components/DataWorkspace/components/WorkSpaceTree"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getGlobalInfoExecutionResult } from "@/redux/currentUser/currentUserSelector"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = props => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const actionList = useSelector(getActionList)
  const widgetExecutionArray = useSelector(getWidgetExecutionResultArray)
  const actionExecutionArray = useSelector(getActionExecutionResultArray)
  const globalInfoList = useSelector(getGlobalInfoExecutionResult)
  const selectedComponents = useSelector(getSelectedComponentsDisplayName)
  const selectedAction = useSelector(getSelectedAction)

  const root = useSelector(getCanvas)
  const handleComponentSelect = useCallback(
    (selectedKeys: string[]) => {
      const selectedComponent = searchDsl(root, selectedKeys[0])
      selectedComponent &&
        dispatch(configActions.updateSelectedComponent([selectedComponent]))
    },
    [root],
  )

  const handleActionSelect = (selectedKeys: string[]) => {
    const action = actionList.find(item => item.displayName === selectedKeys[0])
    action && dispatch(configActions.updateSelectedAction(action))
  }

  return (
    <div className={className}>
      <WorkSpaceTree
        title={`${t("editor.data_work_space.actions_title")}(${
          actionExecutionArray.length
        })`}
        dataList={actionExecutionArray}
        selectedKeys={[selectedAction?.displayName ?? ""]}
        handleSelect={handleActionSelect}
      />
      <WorkSpaceTree
        title={`${t("editor.data_work_space.components_title")}(${
          widgetExecutionArray.length
        })`}
        dataList={widgetExecutionArray}
        selectedKeys={selectedComponents}
        handleSelect={handleComponentSelect}
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
