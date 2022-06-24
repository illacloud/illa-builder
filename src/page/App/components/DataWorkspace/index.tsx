import { FC, HTMLAttributes, useState, useCallback, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { WorkSpaceItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceItem"
import {
  getCanvas,
  searchDsl,
} from "@/redux/currentApp/editor/components/componentsSelector"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { getBuilderInfo } from "@/redux/builderInfo/builderInfoSelector"
import { configActions } from "@/redux/currentApp/config/configSlice"
import { selectAllActionItem } from "@/redux/currentApp/action/actionSelector"
import { splitLineStyle } from "./style"
import {
  actionListTransformer,
  componentListTransformer,
  globalInfoTransformer,
} from "./utils"

interface DataWorkspaceProps extends HTMLAttributes<HTMLDivElement> {}

export const DataWorkspace: FC<DataWorkspaceProps> = (props) => {
  const { className } = props
  const dispatch = useDispatch()
  const actionList = useSelector(selectAllActionItem)
  const _actionList = actionListTransformer(actionList)
  const root = useSelector(getCanvas)
  const _componentList = componentListTransformer(root!)
  const userInfo = useSelector(getCurrentUser)
  const builderInfo = useSelector(getBuilderInfo)
  const globalInfoList = [
    {
      ...builderInfo,
      displayName: "builder_info",
      treeId: "builder_info",
    },
    {
      ...userInfo,
      displayName: "current_user",
      treeId: userInfo?.userId ?? "current_user",
    },
  ]
  const _globalInfoList = globalInfoTransformer(globalInfoList)

  const handleComponentSelect = (selectedKeys: string[]) => {
    const selectedComponent = searchDsl(root, selectedKeys[0])
    selectedComponent &&
      dispatch(configActions.updateSelectedComponent([selectedComponent]))
  }

  const handleActionSelect = (selectedKeys: string[]) => {
    const action = actionList.find((item) => item.actionId === selectedKeys[0])
    action && dispatch(configActions.updateSelectedAction(action))
  }

  return (
    <div className={className}>
      <WorkSpaceItem
        title={`ACTIONS & TRANSFORMERS (${_actionList.length})`}
        dataList={_actionList}
        handleSelect={handleActionSelect}
      />
      <div css={splitLineStyle} />
      <WorkSpaceItem
        title={`COMPONENTS (${_componentList.length})`}
        dataList={_componentList}
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
