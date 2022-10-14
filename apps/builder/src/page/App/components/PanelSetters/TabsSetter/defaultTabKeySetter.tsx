import { FC, useCallback, useMemo } from "react"
import { TabsDefaultTabKeySetterProps } from "./interface"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { get } from "lodash"
import { ViewItemShape } from "./ViewsSetter/interface"

export const TabsDefaultTabKeySetter: FC<TabsDefaultTabKeySetterProps> = (
  props,
) => {
  const {
    attrName,
    handleUpdateMultiAttrDSL,
    expectedType,
    widgetDisplayName,
    widgetType,
    widgetOrAction,
    value,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const tabList = useMemo(() => {
    return get(targetComponentProps, "tabList", []) as ViewItemShape[]
  }, [targetComponentProps])

  const handleUpdateDefaultTab = useCallback(
    (attrPath: string, value: string) => {
      const defaultTabIndex = tabList.findIndex((view) => view.key === value)
      let currentIndex = 0
      let currentKey = tabList[currentIndex].key
      if (defaultTabIndex > -1) {
        currentIndex = defaultTabIndex
        currentKey = tabList[currentIndex].key
      }
      handleUpdateMultiAttrDSL?.({
        [attrPath]: value,
        currentViewIndex: currentIndex,
        currentViewKey: currentKey,
      })
    },
    [handleUpdateMultiAttrDSL, tabList],
  )

  return (
    <BaseInput
      attrName={attrName}
      handleUpdateDsl={handleUpdateDefaultTab}
      expectedType={expectedType}
      widgetDisplayName={widgetDisplayName}
      widgetType={widgetType}
      widgetOrAction={widgetOrAction}
      value={value}
    />
  )
}

TabsDefaultTabKeySetter.displayName = "TabsDefaultTabKeySetter"
