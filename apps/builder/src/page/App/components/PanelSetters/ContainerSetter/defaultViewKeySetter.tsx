import { FC, useCallback, useMemo } from "react"
import { ContainerDefaultViewKeySetterProps } from "@/page/App/components/PanelSetters/ContainerSetter/interface"
import { BaseInput } from "@/page/App/components/PanelSetters/InputSetter/baseInput"
import { useSelector } from "react-redux"
import { RootState } from "@/store"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { get } from "lodash"
import { ViewItemShape } from "@/page/App/components/PanelSetters/ContainerSetter/ViewsSetter/interface"

export const ContainerDefaultViewKeySetter: FC<ContainerDefaultViewKeySetterProps> = props => {
  const {
    attrName,
    handleUpdateMultiAttrDSL,
    expectedType,
    widgetDisplayName,
    widgetType,
    widgetOrAction,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    rootState => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const realViews = useMemo(() => {
    return get(targetComponentProps, "viewList", []) as ViewItemShape[]
  }, [targetComponentProps])

  const handleUpdateDefaultView = useCallback(
    (attrPath: string, value: string) => {
      const defaultViewIndex = realViews.findIndex(view => view.key === value)
      let currentIndex = 0
      let currentKey = realViews[currentIndex].key
      if (defaultViewIndex > -1) {
        currentIndex = defaultViewIndex
        currentKey = realViews[currentIndex].key
      }
      handleUpdateMultiAttrDSL?.({
        [attrPath]: value,
        currentViewIndex: currentIndex,
        currentViewKey: currentKey,
      })
    },
    [handleUpdateMultiAttrDSL, realViews],
  )

  return (
    <BaseInput
      attrName={attrName}
      handleUpdateDsl={handleUpdateDefaultView}
      expectedType={expectedType}
      widgetDisplayName={widgetDisplayName}
      widgetType={widgetType}
      widgetOrAction={widgetOrAction}
    />
  )
}

ContainerDefaultViewKeySetter.displayName = "ContainerDefaultViewKeySetter"
