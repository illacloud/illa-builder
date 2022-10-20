import { createContext, ReactNode, FC, useCallback, useMemo } from "react"
import { ViewItemShape } from "../interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import {
  generateNewViewItem,
  generateTabItemId,
} from "../utils/generateNewOptions"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { get } from "lodash"

interface ProviderProps {
  list: ViewItemShape[]
  childrenSetter: PanelFieldConfig[]
  widgetDisplayName: string
  attrPath: string
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  children: ReactNode
}

interface Inject extends Omit<ProviderProps, "children"> {
  handleDeleteOptionItem: (index: number) => void
  handleCopyOptionItem: (index: number) => void
  handleUpdateCurrentViewIndex: (index: number) => void
  currentViewIndex: number
  handleMoveOptionItem: (dragIndex: number, hoverIndex: number) => void
}

export const TabListSetterContext = createContext<Inject>({} as Inject)

export const TabListSetterProvider: FC<ProviderProps> = (props) => {
  const { list, attrPath, widgetDisplayName, handleUpdateMultiAttrDSL } = props
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
      if (list.length <= 1) return
      const updatedArray = list.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )

      const updateSlice = {
        [attrPath]: updatedArray,
        currentIndex: 0,
        currentKey: allViewsKeys[0],
      }

      if (currentViewIndex !== index) {
        const oldCurrentViewKey = list[currentViewIndex].key
        const newCurrentViewIndex = updatedArray.findIndex(
          (item) => item.key === oldCurrentViewKey,
        )
        if (newCurrentViewIndex !== -1) {
          updateSlice.currentIndex = newCurrentViewIndex
          updateSlice.currentKey = oldCurrentViewKey
        }
      }

      handleUpdateMultiAttrDSL?.(updateSlice)
    },
    [list, attrPath, allViewsKeys, currentViewIndex, handleUpdateMultiAttrDSL],
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
        id: generateTabItemId(),
      }
      const updatedArray = [...list, targetOptionItem]
      handleUpdateMultiAttrDSL?.({
        [attrPath]: updatedArray,
      })
    },
    [list, allViewsKeys, handleUpdateMultiAttrDSL, attrPath],
  )

  const handleUpdateCurrentViewIndex = useCallback(
    (index: number) => {
      if (index > list.length || index < 0) return
      const currentViewKey = allViews[index].key
      handleUpdateMultiAttrDSL?.({
        currentIndex: index,
        currentKey: currentViewKey || index,
      })
    },
    [allViews, handleUpdateMultiAttrDSL, list.length],
  )

  const handleMoveOptionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = list[dragIndex]
      const currentSelected = list[currentViewIndex]
      const newViews = [...list]
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
    },
    [attrPath, currentViewIndex, handleUpdateMultiAttrDSL, list],
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
    <TabListSetterContext.Provider value={value}>
      {props.children}
    </TabListSetterContext.Provider>
  )
}

TabListSetterProvider.displayName = "OptionListSetterProvider"
