import { FC, useCallback, useMemo } from "react"
import { ChartDataSourceSetterProps } from "@/page/App/components/PanelSetters/ChartSetter/interface"
import { useSelector } from "react-redux"
import { getAllContainerWidget } from "@/redux/currentApp/editor/components/componentsSelector"
import { RootState } from "@/store"
import { get, isEqual } from "lodash"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { BaseSelectSetter } from "@/page/App/components/PanelSetters/SelectSetter/baseSelect"

export const TabsContainerSelectSetter: FC<ChartDataSourceSetterProps> = (
  props,
) => {
  const {
    value,
    handleUpdateMultiAttrDSL,
    widgetDisplayName,
    attrName,
    allowClear,
    componentNode,
    isSetterSingleRow,
    widgetOrAction,
    widgetType,
    expectedType,
  } = props
  const containers = useSelector(getAllContainerWidget)

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )
  const viewList = useMemo(() => {
    return get(targetComponentProps, "viewList", [])
  }, [targetComponentProps])

  const selectedOptions = useMemo(() => {
    if (!containers) return
    return Object.keys(containers)
  }, [containers])

  const handleUpdateDsl = useCallback(
    (attrName: string, newValue: any) => {
      try {
        const newList = get(containers, `${newValue}.viewList`, {})
        if (!isEqual(newList, viewList)) {
          handleUpdateMultiAttrDSL?.({
            viewList: newList,
            [attrName]: newValue,
          })
          return
        }
      } catch {}
      handleUpdateMultiAttrDSL?.({
        [attrName]: newValue,
      })
    },
    [viewList, handleUpdateMultiAttrDSL],
  )

  return (
    <BaseSelectSetter
      options={selectedOptions}
      expectedType={expectedType}
      value={value}
      allowClear={allowClear}
      attrName={attrName}
      componentNode={componentNode}
      handleUpdateDsl={handleUpdateDsl}
      isSetterSingleRow={isSetterSingleRow}
      widgetDisplayName={widgetDisplayName}
      widgetOrAction={widgetOrAction}
      widgetType={widgetType}
    />
  )
}

TabsContainerSelectSetter.displayName = "TabsContainerSelectSetter"
