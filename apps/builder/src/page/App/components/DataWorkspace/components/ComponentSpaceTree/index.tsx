import { FC, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { omit } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { WorkSpaceTreeGroup } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeGroup"
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem"
import { hiddenFields } from "@/page/App/components/DataWorkspace/constant"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getCurrentPageGeneralWidgetExecutionResultArray,
  getCurrentPageModalWidgetExecutionResultArray,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { FocusManager } from "@/utils/focusManager"

export const ComponentSpaceTree: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const generalWidgetExecutionArray = useSelector(
    getCurrentPageGeneralWidgetExecutionResultArray,
  )
  const modalWidgetExecutionArray = useSelector(
    getCurrentPageModalWidgetExecutionResultArray,
  )
  const selectedComponents = useSelector(getSelectedComponentDisplayNames)

  const handleGeneralComponentSelect = useCallback(
    (selectedKeys: string[]) => {
      dispatch(configActions.updateSelectedComponent(selectedKeys))
    },
    [dispatch],
  )

  const handleModalComponentSelect = useCallback(
    (selectedKeys: string[]) => {
      dispatch(
        executionActions.updateModalDisplayReducer({
          displayName: selectedKeys[0],
          display: true,
        }),
      )
      dispatch(configActions.updateSelectedComponent(selectedKeys))
    },
    [dispatch],
  )

  const componentTotalNumber =
    generalWidgetExecutionArray.length + modalWidgetExecutionArray.length

  const generalWidgetTree = useMemo(() => {
    return generalWidgetExecutionArray.map((data) => {
      return (
        <WorkSpaceTreeItem
          key={data.displayName}
          title={data.displayName}
          data={omit(data, hiddenFields)}
          level={0}
          handleSelect={handleGeneralComponentSelect}
          isSelected={selectedComponents?.includes(data.displayName)}
          parentKey={data.displayName}
        />
      )
    })
  }, [
    generalWidgetExecutionArray,
    handleGeneralComponentSelect,
    selectedComponents,
  ])

  const modalWidgetTree = useMemo(() => {
    return modalWidgetExecutionArray.map((data) => {
      return (
        <WorkSpaceTreeItem
          key={data.displayName}
          title={data.displayName}
          data={omit(data, hiddenFields)}
          level={0}
          handleSelect={handleModalComponentSelect}
          isSelected={selectedComponents?.includes(data.displayName)}
          parentKey={data.displayName}
        />
      )
    })
  }, [
    handleModalComponentSelect,
    modalWidgetExecutionArray,
    selectedComponents,
  ])

  return (
    <PanelBar
      title={
        t("editor.data_work_space.components_title") +
        `(${componentTotalNumber})`
      }
      onIllaFocus={() => {
        FocusManager.switchFocus("data_component")
      }}
      destroyChildrenWhenClose
    >
      <WorkSpaceTreeGroup title="Modal">{modalWidgetTree}</WorkSpaceTreeGroup>
      <WorkSpaceTreeGroup title="General">
        {generalWidgetTree}
      </WorkSpaceTreeGroup>
    </PanelBar>
  )
}

ComponentSpaceTree.displayName = "ComponentSpaceTree"
