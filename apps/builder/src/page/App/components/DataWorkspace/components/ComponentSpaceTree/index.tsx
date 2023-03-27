import { cloneDeep } from "lodash"
import { FC, MouseEvent, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { omit } from "@illa-design/react"
import { PanelBar } from "@/components/PanelBar"
import { hiddenFields } from "@/page/App/components/DataWorkspace/components/WorkSpaceTree"
import { WorkSpaceTreeGroup } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeGroup"
import { WorkSpaceTreeItem } from "@/page/App/components/DataWorkspace/components/WorkSpaceTreeItem"
import { changeSelectedDisplayName } from "@/page/App/components/ScaleSquare/utils/changeSelectedDisplayName"
import { getSelectedComponents } from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import {
  getComponentDisplayNameMapDepth,
  getShowWidgetNameParentMap,
} from "@/redux/currentApp/editor/components/componentsSelector"
import {
  getGeneralWidgetExecutionResultArray,
  getModalWidgetExecutionResultArray,
} from "@/redux/currentApp/executionTree/executionSelector"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { FocusManager } from "@/utils/focusManager"
import { isMAC } from "@/utils/userAgent"

export const ComponentSpaceTree: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const generalWidgetExecutionArray = useSelector(
    getGeneralWidgetExecutionResultArray,
  )
  const modalWidgetExecutionArray = useSelector(
    getModalWidgetExecutionResultArray,
  )
  const selectedComponents = useSelector(getSelectedComponents)
  const displayNameMapDepth = useSelector(getComponentDisplayNameMapDepth)
  const widgetDisplayNameRelationMap = useSelector(getShowWidgetNameParentMap)

  const handleSelectComponentWhenPressMetaKey = useCallback(
    (selectedKeys: string[]) => {
      let currentSelectedDisplayName = cloneDeep(selectedComponents)
      const index = currentSelectedDisplayName.findIndex(
        (displayName) => displayName === selectedKeys[0],
      )
      if (index !== -1) {
        currentSelectedDisplayName.splice(index, 1)
      } else {
        currentSelectedDisplayName.push(...selectedKeys)
      }
      changeSelectedDisplayName(
        currentSelectedDisplayName,
        widgetDisplayNameRelationMap,
        selectedKeys[0],
        displayNameMapDepth,
      )
      currentSelectedDisplayName = Array.from(
        new Set(currentSelectedDisplayName),
      )
      dispatch(
        configActions.updateSelectedComponent(currentSelectedDisplayName),
      )
    },
    [
      dispatch,
      displayNameMapDepth,
      selectedComponents,
      widgetDisplayNameRelationMap,
    ],
  )

  const handleGeneralComponentSelect = useCallback(
    (selectedKeys: string[], e: MouseEvent<HTMLDivElement>) => {
      // if ((isMAC() && e.metaKey) || (!isMAC() && e.ctrlKey)) {
      //   handleSelectComponentWhenPressMetaKey(selectedKeys)
      //   return
      // }
      dispatch(configActions.updateSelectedComponent(selectedKeys))
    },
    [dispatch],
  )

  const handleModalComponentSelect = useCallback(
    (selectedKeys: string[], e: MouseEvent<HTMLDivElement>) => {
      // if ((isMAC() && e.metaKey) || (!isMAC() && e.ctrlKey)) {
      //   handleSelectComponentWhenPressMetaKey(selectedKeys)
      //   return
      // }
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
          handleSelect={handleGeneralComponentSelect}
          isSelected={selectedComponents?.includes(data.displayName)}
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
          handleSelect={handleModalComponentSelect}
          isSelected={selectedComponents?.includes(data.displayName)}
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
        FocusManager.switchFocus("dataWorkspace_component")
      }}
    >
      <WorkSpaceTreeGroup title="Modal">{modalWidgetTree}</WorkSpaceTreeGroup>
      <WorkSpaceTreeGroup title="General">
        {generalWidgetTree}
      </WorkSpaceTreeGroup>
    </PanelBar>
  )
}

ComponentSpaceTree.displayName = "ComponentSpaceTree"
