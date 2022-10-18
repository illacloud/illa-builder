import { createContext, ReactNode, FC, useCallback, useMemo } from "react"
import { ViewItemShape } from "../interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import {
  generateNewViewItem,
  generateViewItemId,
} from "../utils/generateNewOptions"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { cloneDeep, get } from "lodash"

interface ProviderProps {
  list: ViewItemShape[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  linkWidgetDisplayName: string
  attrPath: string
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
    list,
    attrPath,
    handleUpdateDsl,
    widgetDisplayName,
    linkWidgetDisplayName,
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
  } = props
  const executionResult = useSelector(getExecutionResult)

  const allViews = useMemo(() => {
    return get(
      executionResult,
      `${widgetDisplayName}.${attrPath}`,
      [],
    ) as ViewItemShape[]
  }, [attrPath, executionResult, widgetDisplayName])

  const viewComponentsArray = useMemo(() => {
    return get(
      executionResult,
      `${linkWidgetDisplayName}.viewComponentsArray`,
      [[]],
    ) as string[][]
  }, [executionResult, linkWidgetDisplayName])

  const currentIndex = useMemo(() => {
    return get(executionResult, `${widgetDisplayName}.currentIndex`)
  }, [executionResult, widgetDisplayName])

  const allViewsKeys = useMemo(() => {
    return allViews.map((view) => view.key)
  }, [allViews])

  const handleDeleteOptionItem = useCallback(
    (index: number) => {
      if (list.length <= 1) return
      const updatedArray = list.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )
      const newViewComponentsArray = viewComponentsArray.filter(
        (displayNames, i) => i !== index,
      )

      const updateSlice = {
        [attrPath]: updatedArray,
        currentIndex: 0,
        currentKey: allViewsKeys[0],
      }

      if (currentIndex !== index) {
        const oldCurrentViewKey = list[currentIndex].key
        const newCurrentViewIndex = updatedArray.findIndex(
          (item) => item.key === oldCurrentViewKey,
        )
        if (newCurrentViewIndex !== -1) {
          updateSlice.currentIndex = newCurrentViewIndex
          updateSlice.currentKey = oldCurrentViewKey
        }
      }

      handleUpdateMultiAttrDSL?.(updateSlice)
      console.log(
        linkWidgetDisplayName,
        handleUpdateOtherMultiAttrDSL,
        "linkWidget",
      )
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrPath]: updatedArray,
          currentViewIndex: updateSlice.currentIndex,
          currentViewKey: updateSlice.currentKey,
          viewComponentsArray: newViewComponentsArray,
        })
      }
    },
    [
      list,
      viewComponentsArray,
      attrPath,
      allViewsKeys,
      currentIndex,
      handleUpdateMultiAttrDSL,
      linkWidgetDisplayName,
      handleUpdateOtherMultiAttrDSL,
    ],
  )

  const handleCopyOptionItem = useCallback(
    (index: number) => {
      let targetOptionItem = list.find(
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
      const updatedArray = [...list, targetOptionItem]
      handleUpdateDsl(attrPath, updatedArray)
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrPath]: updatedArray,
        })
      }
    },
    [
      list,
      allViewsKeys,
      handleUpdateDsl,
      attrPath,
      linkWidgetDisplayName,
      handleUpdateOtherMultiAttrDSL,
    ],
  )

  const handleUpdateCurrentViewIndex = useCallback(
    (index: number) => {
      if (index > list.length || index < 0) return
      const currentViewKey = allViews[index].key
      handleUpdateMultiAttrDSL?.({
        currentIndex: index,
        currentKey: currentViewKey || index,
      })
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          currentViewIndex: index,
          currentViewKey: currentViewKey || index,
        })
      }
    },
    [
      allViews,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
      linkWidgetDisplayName,
      list.length,
    ],
  )

  const handleMoveOptionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = list[dragIndex]
      const dragViewArray = viewComponentsArray[dragIndex]
      const hoverViewArray = viewComponentsArray[hoverIndex]
      const currentSelected = list[currentIndex]
      if (!dragViewArray || !hoverViewArray) return
      const newViewComponentsArray = cloneDeep(
        viewComponentsArray,
      ) as string[][]
      ;[newViewComponentsArray[dragIndex], newViewComponentsArray[hoverIndex]] =
        [newViewComponentsArray[hoverIndex], newViewComponentsArray[dragIndex]]
      const newViews = [...list]
      newViews.splice(dragIndex, 1)
      newViews.splice(hoverIndex, 0, dragOptionItem)
      const newSelectedIndex = newViews.findIndex(
        (view) => view.key === currentSelected.key,
      )
      const newSelectedKey = newViews[newSelectedIndex].key
      handleUpdateMultiAttrDSL?.({
        [attrPath]: newViews,
        viewComponentsArray: newViewComponentsArray,
        currentViewIndex: newSelectedIndex,
        currentViewKey: newSelectedKey,
      })
      handleUpdateDsl(attrPath, newViews)
      if (linkWidgetDisplayName) {
        handleUpdateOtherMultiAttrDSL?.(linkWidgetDisplayName, {
          [attrPath]: newViews,
          viewComponentsArray: newViewComponentsArray,
          currentViewIndex: newSelectedIndex,
          currentViewKey: newSelectedKey,
        })
      }
    },
    [
      list,
      viewComponentsArray,
      currentIndex,
      handleUpdateMultiAttrDSL,
      attrPath,
      handleUpdateDsl,
      linkWidgetDisplayName,
      handleUpdateOtherMultiAttrDSL,
    ],
  )
  const value = {
    ...props,
    handleDeleteOptionItem,
    handleCopyOptionItem,
    // TODO: to currentIndex
    currentViewIndex: currentIndex,
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
