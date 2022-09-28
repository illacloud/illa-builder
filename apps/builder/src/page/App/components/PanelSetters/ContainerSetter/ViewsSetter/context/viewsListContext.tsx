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
  viewsList: ViewItemShape[]
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

export const ViewListSetterContext = createContext<Inject>({} as Inject)

export const ViewListSetterProvider: FC<ProviderProps> = props => {
  const {
    viewsList,
    attrPath,
    handleUpdateDsl,
    widgetDisplayName,
    handleUpdateMultiAttrDSL,
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
    return get(executionResult, `${widgetDisplayName}.viewComponentsArray`, [
      [],
    ]) as string[][]
  }, [executionResult, widgetDisplayName])

  const currentViewIndex = useMemo(() => {
    return get(executionResult, `${widgetDisplayName}.currentViewIndex`)
  }, [executionResult, widgetDisplayName])

  const allViewsKeys = useMemo(() => {
    return allViews.map(view => view.key)
  }, [allViews])

  const handleDeleteOptionItem = useCallback(
    (index: number) => {
      if (viewsList.length <= 1) return
      const updatedArray = viewsList.filter(
        (optionItem: Record<string, any>, i: number) => {
          return i !== index
        },
      )
      const newViewComponentsArray = viewComponentsArray.filter(
        (displayNames, i) => i !== index,
      )
      handleUpdateMultiAttrDSL?.({
        [attrPath]: updatedArray,
        currentViewIndex: 0,
        currentViewKey: allViewsKeys[0],
        viewComponentsArray: newViewComponentsArray,
      })
    },
    [
      viewsList,
      viewComponentsArray,
      handleUpdateMultiAttrDSL,
      attrPath,
      allViewsKeys,
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
      const newItem = generateNewViewItem(allViewsKeys)
      targetOptionItem = {
        ...targetOptionItem,
        key: newItem.key,
        id: generateViewItemId(),
      }
      const updatedArray = [...viewsList, targetOptionItem]
      handleUpdateDsl(attrPath, updatedArray)
    },
    [viewsList, allViewsKeys, handleUpdateDsl, attrPath],
  )

  const handleUpdateCurrentViewIndex = useCallback(
    (index: number) => {
      if (index > viewsList.length || index < 0) return
      const currentViewKey = allViews[index].key
      handleUpdateMultiAttrDSL?.({
        currentViewIndex: index,
        currentViewKey: currentViewKey || index,
      })
    },
    [allViews, handleUpdateMultiAttrDSL, viewsList.length],
  )

  const handleMoveOptionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = viewsList[dragIndex]
      const dragViewArray = viewComponentsArray[dragIndex]
      const hoverViewArray = viewComponentsArray[hoverIndex]
      const currentSelected = viewsList[currentViewIndex]
      if (!dragViewArray || !hoverViewArray) return
      const newViewComponentsArray = cloneDeep(
        viewComponentsArray,
      ) as string[][]
      ;[
        newViewComponentsArray[dragIndex],
        newViewComponentsArray[hoverIndex],
      ] = [
        newViewComponentsArray[hoverIndex],
        newViewComponentsArray[dragIndex],
      ]
      const newViews = [...viewsList]
      newViews.splice(dragIndex, 1)
      newViews.splice(hoverIndex, 0, dragOptionItem)
      const newSelectedIndex = newViews.findIndex(
        view => view.key === currentSelected.key,
      )
      const newSelectedKey = newViews[newSelectedIndex].key
      handleUpdateMultiAttrDSL?.({
        [attrPath]: newViews,
        viewComponentsArray: newViewComponentsArray,
        currentViewIndex: newSelectedIndex,
        currentViewKey: newSelectedKey,
      })
      handleUpdateDsl(attrPath, newViews)
    },
    [
      attrPath,
      handleUpdateDsl,
      handleUpdateMultiAttrDSL,
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
