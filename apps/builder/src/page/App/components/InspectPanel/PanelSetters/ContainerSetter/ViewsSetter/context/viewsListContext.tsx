import { ComponentMapNode } from "@illa-public/public-types"
import { klona } from "klona/json"
import { get } from "lodash-es"
import { FC, ReactNode, createContext, useCallback, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PanelFieldConfig } from "@/page/App/components/InspectPanel/interface"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { newGenerateChildrenComponentNode } from "@/utils/generators/generateComponentNode"
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
  componentNode: ComponentMapNode
  handleUpdateDsl: (attrPath: string, value: any) => void
  handleUpdateMultiAttrDSL?: (updateSlice: Record<string, any>) => void
  handleUpdateExecutionResult?: (
    displayName: string,
    updateSlice: Record<string, any>,
  ) => void
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
    handleUpdateExecutionResult,
    componentNode,
  } = props
  const dispatch = useDispatch()
  const executionResult = useSelector(getExecutionResult)

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const allViews = useMemo(() => {
    return get(
      executionResult,
      `${widgetDisplayName}.${attrPath}`,
      [],
    ) as ViewItemShape[]
  }, [attrPath, executionResult, widgetDisplayName])

  const linkWidgetDisplayName = useMemo(() => {
    return get(targetComponentProps, "linkWidgetDisplayName", "") as string
  }, [targetComponentProps])

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

      const currentChildrenNodeDisplayName = componentNode.childrenNode[index]

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
          displayNames: [currentChildrenNodeDisplayName],
        }),
      )
    },
    [
      allViewsKeys,
      attrPath,
      componentNode.childrenNode,
      currentViewIndex,
      dispatch,
      handleUpdateMultiAttrDSL,
      viewsList,
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
      const newChildrenNodes = newGenerateChildrenComponentNode(
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
      allViewsKeys,
      attrPath,
      componentNode.displayName,
      dispatch,
      handleUpdateMultiAttrDSL,
      viewsList,
    ],
  )

  const handleUpdateCurrentViewIndex = useCallback(
    (index: number) => {
      if (index > viewsList.length || index < 0) return
      const currentViewKey = allViews[index].key
      handleUpdateExecutionResult?.(widgetDisplayName, {
        currentIndex: index,
        currentKey: currentViewKey || index,
      })
      if (linkWidgetDisplayName) {
        if (Array.isArray(linkWidgetDisplayName)) {
          linkWidgetDisplayName.forEach((linkDisplayName) => {
            handleUpdateExecutionResult?.(linkDisplayName, {
              currentIndex: index,
              currentKey: currentViewKey || index,
            })
          })
        } else {
          handleUpdateExecutionResult?.(linkWidgetDisplayName, {
            currentIndex: index,
            currentKey: currentViewKey || index,
          })
          const linkWidgetLinkedDisplayName = get(
            executionResult,
            `${linkWidgetDisplayName}.linkWidgetDisplayName`,
            [],
          )
          linkWidgetLinkedDisplayName &&
            Array.isArray(linkWidgetLinkedDisplayName) &&
            linkWidgetLinkedDisplayName.forEach((name) => {
              name !== widgetDisplayName &&
                handleUpdateExecutionResult?.(name, {
                  currentIndex: index,
                  currentKey: currentViewKey || index,
                })
            })
        }
      }
    },
    [
      allViews,
      executionResult,
      handleUpdateExecutionResult,
      linkWidgetDisplayName,
      viewsList.length,
      widgetDisplayName,
    ],
  )

  const handleMoveOptionItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragOptionItem = viewsList[dragIndex]
      const currentSelected = viewsList[currentViewIndex]
      const newComponentNode = klona(componentNode.childrenNode)
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
