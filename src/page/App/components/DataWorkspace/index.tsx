import { FC, HTMLAttributes, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Scrollbars } from "react-custom-scrollbars"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { configActions } from "@/redux/config/configSlice"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import {
  getActionExecutionResultArray,
  getWidgetExecutionResultArray,
} from "@/redux/currentApp/executionTree/execution/executionSelector"
import {
  getSelectedAction,
  getSelectedComponentsDisplayName,
} from "@/redux/config/configSelector"
import { WorkSpaceTree } from "@/page/App/components/DataWorkspace/components/WorkSpaceTree"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const actionList = useSelector(selectAllActionItem)
  const widgetExecutionArray = useSelector(getWidgetExecutionResultArray)
  const actionExecutionArray = useSelector(getActionExecutionResultArray)
  const userInfo = useSelector(getCurrentUser)
  const builderInfo = useSelector(getBuilderInfo)
  const globalInfoList = [
    {
      ...builderInfo,
      displayName: "builderInfo",
    },
    {
      ...userInfo,
      displayName: "currentUser",
    },
  ]

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
    const action = actionList.find(
      (item) => item.displayName === selectedKeys[0],
    )
    action && dispatch(configActions.updateSelectedAction(action))
  }

  return (
    <div className={className}>
      <Scrollbars autoHide>
        <WorkSpaceTree
          title={`${t("editor.data_work_space.actions_title")}(${
            actionExecutionArray.length
          })`}
          dataList={actionExecutionArray}
          selectedKeys={[selectedAction.displayName]}
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
      </Scrollbars>
    </div>
  )
}

DataWorkspace.displayName = "DataWorkspace"
