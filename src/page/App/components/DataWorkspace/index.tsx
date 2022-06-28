import { FC, HTMLAttributes, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WorkSpaceItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceItem"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { configActions } from "@/redux/config/configSlice"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { splitLineStyle } from "./style"
import {
  actionListTransformer,
  widgetListTransformer,
  globalInfoTransformer,
} from "./utils"
import { getWidgetExecutionResult } from "@/redux/currentApp/executionTree/execution/executionSelector"
import {
  getSelectedAction,
  getSelectedComponentsDisplayName,
} from "@/redux/config/configSelector"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props
  const dispatch = useDispatch()
  const actionList = useSelector(selectAllActionItem)
  const _actionList = actionListTransformer(actionList)
  const widgetExecution = useSelector(getWidgetExecutionResult)
  const widgetList = widgetListTransformer(widgetExecution)
  const userInfo = useSelector(getCurrentUser)
  const builderInfo = useSelector(getBuilderInfo)
  const globalInfoList = [
    {
      ...builderInfo,
      displayName: "builderInfo",
      treeId: "builderInfo",
    },
    {
      ...userInfo,
      displayName: "currentUser",
      treeId: userInfo?.userId ?? "currentUser",
    },
  ]
  const _globalInfoList = globalInfoTransformer(globalInfoList)

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
    const action = actionList.find((item) => item.actionId === selectedKeys[0])
    action && dispatch(configActions.updateSelectedAction(action))
  }

  return (
    <div className={className}>
      <WorkSpaceItem
        title={`ACTIONS & TRANSFORMERS (${_actionList.length})`}
        dataList={_actionList}
        selectedKeys={[selectedAction.actionId]}
        handleSelect={handleActionSelect}
      />
      <div css={splitLineStyle} />
      <WorkSpaceItem
        title={`COMPONENTS (${widgetList.length})`}
        dataList={widgetList}
        selectedKeys={selectedComponents}
        handleSelect={handleComponentSelect}
      />
      <div css={splitLineStyle} />
      <WorkSpaceItem
        title={`GLOBALS (${_globalInfoList.length})`}
        dataList={_globalInfoList}
      />
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
