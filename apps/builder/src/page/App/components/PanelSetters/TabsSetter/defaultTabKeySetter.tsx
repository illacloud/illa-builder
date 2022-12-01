import { get } from "lodash"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ViewItemShape } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { TabsDefaultKeySetterProps } from "./interface"

export const TabsDefaultKeySetter: FC<TabsDefaultKeySetterProps> = (props) => {
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
      let currentIndex
      if (defaultTabIndex > -1) {
        currentIndex = defaultTabIndex
      }
      handleUpdateMultiAttrDSL?.({
        [attrPath]: value,
        currentIndex,
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

TabsDefaultKeySetter.displayName = "TabsDefaultKeySetter"
