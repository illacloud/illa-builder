import { createContext, ReactNode, FC, useCallback, useMemo } from "react"
import { ViewItemShape } from "../interface"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import {
  generateNewViewItem,
  generateViewItemId,
} from "../utils/generateNewOptions"
import { useSelector } from "react-redux"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { get } from "lodash"

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
      handleUpdateMultiAttrDSL?.({
        [attrPath]: updatedArray,
        currentViewIndex: 0,
        currentViewKey: allViewsKeys[0],
      })
    },
    [viewsList, handleUpdateMultiAttrDSL, attrPath, allViewsKeys],
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

  const value = {
    ...props,
    handleDeleteOptionItem,
    handleCopyOptionItem,
    currentViewIndex,
    handleUpdateCurrentViewIndex,
  }

  return (
    <ViewListSetterContext.Provider value={value}>
      {props.children}
    </ViewListSetterContext.Provider>
  )
}

ViewListSetterProvider.displayName = "OptionListSetterProvider"
