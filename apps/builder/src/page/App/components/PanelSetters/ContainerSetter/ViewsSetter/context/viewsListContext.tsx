import { createContext, ReactNode, FC, useCallback, useMemo } from "react"
import { ViewItemShape } from "../interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import {
  generateNewViewItem,
  generateViewItemId,
} from "../utils/generateNewOptions"
import { useDispatch, useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { cloneDeep, get } from "lodash"
import { ComponentNode } from "@/redux/currentApp/editor/components/componentsState"
import { componentsActions } from "@/redux/currentApp/editor/components/componentsSlice"

interface ProviderProps {
  viewsList: ViewItemShape[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  linkWidgetDisplayName?: string
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
  handleDeleteOptionItem: (index: number) => void
  handleCopyOptionItem: (index: number) => void
  handleUpdateCurrentViewIndex: (index: number) => void
  currentViewIndex: number
  handleMoveOptionItem: (dragIndex: number, hoverIndex: number) => void
}

export const ViewListSetterContext = createContext<Inject>({} as Inject)

export const ViewListSetterProvider: FC<ProviderProps> = (props) => {
  const {
    viewsList,
    attrPath,
    handleUpdateDsl,
    widgetDisplayName,
    linkWidgetDisplayName,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
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

  const viewComponentsArray = useMemo(() => {
    return get(executionResult, `${widgetDisplayName}.viewComponentsArray`, [
      [],
    ]) as string[][]
  }, [executionResult, widgetDisplayName])

  const currentViewIndex = useMemo(() => {
    return get(executionResult, `${widgetDisplayName}.currentViewIndex`)
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
        currentViewIndex: 0,
        currentViewKey: allViewsKeys[0],
      }

      if (currentViewIndex !== index) {
        const oldCurrentViewKey = viewsList[currentViewIndex].key
        const newCurrentViewIndex = updatedArray.findIndex(
          (item) => item.key === oldCurrentViewKey,
        )
        if (newCurrentViewIndex !== -1) {
          updateSlice.currentViewIndex = newCurrentViewIndex
          updateSlice.currentViewKey = oldCurrentViewKey
        }
      }

      handleUpdateMultiAttrDSL?.(updateSlice)
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrPath]: updatedArray,
          currentIndex: updateSlice.currentViewIndex,
          currentKey: updateSlice.currentViewKey,
        })
      }
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
      linkWidgetDisplayName,
      dispatch,
      handleUpdateOtherMultiAttrDSL,
    ],
  )

  console.log(linkWidgetDisplayName, "linkWidget log")

  const handleCopyOptionItem = useCallback(
    (index: number) => {
      let targetOptionItem = viewsList.find(
        (optionItem: Record<string, any>, i: number) => {
          return i === index
        },
      )
      if (!targetOptionItem) return
      const newItem = generateNewViewItem(allViewsKeys)
      targetOptionItem = {
        ...targetOptionItem,
        key: newItem.key,
        id: generateViewItemId(),
      }
      const updatedArray = [...viewsList, targetOptionItem]
      handleUpdateDsl(attrPath, updatedArray)
      console.log(
        linkWidgetDisplayName,
        handleUpdateOtherMultiAttrDSL,
        "linkWidget",
      )
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrPath]: updatedArray,
        })
      }
    },
    [
      viewsList,
      allViewsKeys,
      handleUpdateDsl,
      attrPath,
      linkWidgetDisplayName,
      handleUpdateOtherMultiAttrDSL,
    ],
  )

  const handleUpdateCurrentViewIndex = useCallback(
    (index: number) => {
      if (index > viewsList.length || index < 0) return
      const currentViewKey = allViews[index].key
      handleUpdateMultiAttrDSL?.({
        currentViewIndex: index,
        currentViewKey: currentViewKey || index,
      })
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          currentIndex: index,
          currentKey: currentViewKey || index,
        })
      }
    },
    [
      allViews,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
      linkWidgetDisplayName,
      viewsList.length,
    ],
  )

  const handleMoveOptionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = viewsList[dragIndex]
      const dragViewArray = viewComponentsArray[dragIndex]
      const hoverViewArray = viewComponentsArray[hoverIndex]
      const currentSelected = viewsList[currentViewIndex]
      if (!dragViewArray || !hoverViewArray) return
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
        currentViewIndex: newSelectedIndex,
        currentViewKey: newSelectedKey,
      })
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrPath]: newViews,
          currentIndex: newSelectedIndex,
          currentKey: newSelectedKey,
        })
      }
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
      handleUpdateOtherMultiAttrDSL,
      linkWidgetDisplayName,
      viewComponentsArray,
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
