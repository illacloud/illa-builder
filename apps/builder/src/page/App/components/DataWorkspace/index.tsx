import { FC, HTMLAttributes, useCallback, MouseEvent } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { configActions } from "@/redux/config/configSlice"
import {
  getActionExecutionResultArray,
  getWidgetExecutionResultArray,
} from "@/redux/currentApp/executionTree/executionSelector"
import {
  getSelectedAction,
  getSelectedComponents,
} from "@/redux/config/configSelector"
import { WorkSpaceTree } from "@/page/App/components/DataWorkspace/components/WorkSpaceTree"
import { getActionList } from "@/redux/currentApp/action/actionSelector"
import { getGlobalInfoExecutionResult } from "@/redux/currentUser/currentUserSelector"
import { FocusManager } from "@/utils/focusManager"
import { cloneDeep } from "lodash"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = props => {
  const { className } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const actionList = useSelector(getActionList)
  const widgetExecutionArray = useSelector(getWidgetExecutionResultArray)
  const actionExecutionArray = useSelector(getActionExecutionResultArray)
  const globalInfoList = useSelector(getGlobalInfoExecutionResult)
  const selectedComponents = useSelector(getSelectedComponents)
  const selectedAction = useSelector(getSelectedAction)

  const handleComponentSelect = useCallback(
    (selectedKeys: string[], e: MouseEvent<HTMLDivElement>) => {
      if (e.metaKey) {
        const currentSelectedDisplayName = cloneDeep(selectedComponents)
        const index = currentSelectedDisplayName.findIndex(
          displayName => displayName === selectedKeys[0],
        )
        if (index !== -1) {
          currentSelectedDisplayName.splice(index, 1)
          dispatch(
            configActions.updateSelectedComponent(currentSelectedDisplayName),
          )
        } else {
          currentSelectedDisplayName.push(...selectedKeys)
          dispatch(
            configActions.updateSelectedComponent(currentSelectedDisplayName),
          )
        }
        return
      }
      if (e.shiftKey) {
        const currentSelectedDisplayName = cloneDeep(selectedComponents)
        if (currentSelectedDisplayName.length === 0) return
        const lastCurrentSelectDisplayName =
          currentSelectedDisplayName[currentSelectedDisplayName.length - 1]
        const selectedDisplayName = selectedKeys[0]
        const currentIndex = widgetExecutionArray.findIndex(
          node => node.displayName === lastCurrentSelectDisplayName,
        )
        const selectedIndex = widgetExecutionArray.findIndex(
          node => node.displayName === selectedDisplayName,
        )
        let left = currentIndex
        let right = selectedIndex
        if (currentIndex > selectedIndex) {
          right = currentIndex
          left = selectedIndex
        } else if (currentIndex < selectedIndex) {
          right = selectedIndex
          left = currentIndex
        }
        if (left !== -1 && right !== -1) {
          const result: string[] = []
          for (let i = left; i <= right; i++) {
            result.push(widgetExecutionArray[i].displayName)
          }
          dispatch(configActions.updateSelectedComponent(result))
        }
        return
      }
      dispatch(configActions.updateSelectedComponent(selectedKeys))
    },
    [dispatch, selectedComponents, widgetExecutionArray],
  )

  const handleActionSelect = useCallback(
    (selectedKeys: string[]) => {
      const action = actionList.find(
        item => item.displayName === selectedKeys[0],
      )
      action && dispatch(configActions.updateSelectedAction(action))
    },
    [actionList, dispatch],
  )

  return (
    <div className={className}>
      <WorkSpaceTree
        title={`${t("editor.data_work_space.components_title")}(${
          widgetExecutionArray.length
        })`}
        dataList={widgetExecutionArray}
        selectedKeys={selectedComponents}
        handleSelect={handleComponentSelect}
        onIllaFocus={() => {
          FocusManager.switchFocus("dataWorkspace_component")
        }}
      />
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
