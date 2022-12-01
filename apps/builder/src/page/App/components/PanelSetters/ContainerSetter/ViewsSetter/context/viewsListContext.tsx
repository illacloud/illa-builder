import { cloneDeep, get } from "lodash"
import { FC, ReactNode, createContext, useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { generateComponentNode } from "@/utils/generators/generateComponentNode"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { ViewItemShape } from "../interface"
import {
  generateNewViewItem,
  generateViewItemId,
} from "../utils/generateNewOptions"

interface ProviderProps {
  viewsList: ViewItemShape[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  componentNode: ComponentNode
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  handleUpdateOtherMultiAttrDSL?: (
    displayName: string,
    updateSlice: Record<string, any>,
  ) => void
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  currentViewIndex: number
  handleDeleteOptionItem: (index: number) => void
  handleCopyOptionItem: (index: number) => void
  handleUpdateCurrentViewIndex: (index: number) => void
  handleMoveOptionItem: (dragIndex: number, hoverIndex: number) => void
}

export const ViewListSetterContext = createContext<Inject>({} as Inject)

export const ViewListSetterProvider: FC<ProviderProps> = (props) => {
  const {
    viewsList,
    attrPath,
    widgetDisplayName,
    handleUpdateMultiAttrDSL,
    componentNode,
  } = props
  const dispatch = useDispatch()
  const executionResult = useSelector(getExecutionResult)

  const allViews = useMemo(() => {
    return get(
      executionResult,
      `${widgetDisplayName}.${attrPath}`,
      [],
    ) as ViewItemShape[]
  }, [attrPath, executionResult, widgetDisplayName])

  const currentViewIndex = useMemo(() => {
    return get(executionResult, `${widgetDisplayName}.currentIndex`)
  }, [executionResult, widgetDisplayName])

  const allViewsKeys = useMemo(() => {
    return allViews.map((view) => view.key)
  }, [allViews])

  const handleDeleteOptionItem = useCallback(
    (index: number) => {
      if (viewsList.length <= 1) return
      const updatedArray = viewsList.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )

      const currentChildrenNode = componentNode.childrenNode[index]

      const updateSlice = {
        [attrPath]: updatedArray,
        currentIndex: 0,
        currentKey: allViewsKeys[0],
      }

      if (currentViewIndex !== index) {
        const oldCurrentViewKey = viewsList[currentViewIndex].key
        const newCurrentViewIndex = updatedArray.findIndex(
          (item) => item.key === oldCurrentViewKey,
        )
        if (newCurrentViewIndex !== -1) {
          updateSlice.currentIndex = newCurrentViewIndex
          updateSlice.currentKey = oldCurrentViewKey
        }
      }

      handleUpdateMultiAttrDSL?.(updateSlice)
      dispatch(
        componentsActions.deleteComponentNodeReducer({
          displayNames: [currentChildrenNode.displayName],
        }),
      )
    },
    [
      viewsList,
      componentNode.childrenNode,
      attrPath,
      allViewsKeys,
      currentViewIndex,
      handleUpdateMultiAttrDSL,
      dispatch,
    ],
  )

  const handleCopyOptionItem = useCallback(
    (index: number) => {
      let targetOptionItem = viewsList.find(
        (optionItem: Record<string, any>, i: number) => {
          return i === index
        },
      )
      if (!targetOptionItem) return
      const newChildrenNodes = generateComponentNode(
        BasicContainerConfig,
        componentNode.displayName,
      )
      const newItem = generateNewViewItem(allViewsKeys)
      targetOptionItem = {
        ...targetOptionItem,
        key: newItem.key,
        id: generateViewItemId(),
      }
      const updatedArray = [...viewsList, targetOptionItem]
      handleUpdateMultiAttrDSL?.({
        [attrPath]: updatedArray,
      })
      dispatch(componentsActions.addComponentReducer([newChildrenNodes]))
    },
    [
      viewsList,
      componentNode.displayName,
      allViewsKeys,
      handleUpdateMultiAttrDSL,
      attrPath,
      dispatch,
    ],
  )

  const handleUpdateCurrentViewIndex = useCallback(
    (index: number) => {
      if (index > viewsList.length || index < 0) return
      const currentViewKey = allViews[index].key
      handleUpdateMultiAttrDSL?.({
        currentIndex: index,
        currentKey: currentViewKey || index,
      })
    },
    [allViews, handleUpdateMultiAttrDSL, viewsList.length],
  )

  const handleMoveOptionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = viewsList[dragIndex]
      const currentSelected = viewsList[currentViewIndex]
      const newComponentNode = cloneDeep(componentNode.childrenNode)
      ;[newComponentNode[dragIndex], newComponentNode[hoverIndex]] = [
        newComponentNode[hoverIndex],
        newComponentNode[dragIndex],
      ]
      const newViews = [...viewsList]
      newViews.splice(dragIndex, 1)
      newViews.splice(hoverIndex, 0, dragOptionItem)
      const newSelectedIndex = newViews.findIndex(
        (view) => view.key === currentSelected.key,
      )
      const newSelectedKey = newViews[newSelectedIndex].key
      handleUpdateMultiAttrDSL?.({
        [attrPath]: newViews,
        currentIndex: newSelectedIndex,
        currentKey: newSelectedKey,
      })
      dispatch(
        componentsActions.sortComponentNodeChildrenReducer({
          parentDisplayName: componentNode.displayName,
          newChildrenNode: newComponentNode,
        }),
      )
    },
    [
      attrPath,
      componentNode.childrenNode,
      componentNode.displayName,
      currentViewIndex,
      dispatch,
      handleUpdateMultiAttrDSL,
      viewsList,
    ],
  )
  const value = {
    ...props,
    handleDeleteOptionItem,
    handleCopyOptionItem,
    currentViewIndex,
    handleUpdateCurrentViewIndex,
    handleMoveOptionItem,
  }

  return (
    <ViewListSetterContext.Provider value={value}>
      {props.children}
    </ViewListSetterContext.Provider>
  )
}

ViewListSetterProvider.displayName = "OptionListSetterProvider"
