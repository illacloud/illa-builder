import { get } from "lodash-es"
import { FC, useCallback, useMemo } from "react"
import { useSelector } from "react-redux"
import { ViewItemShape } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/interface"
import { ContainerDefaultViewKeySetterProps } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/interface"
import BaseInput from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/BaseInput"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"

const ContainerDefaultViewKeySetter: FC<ContainerDefaultViewKeySetterProps> = (
  props,
) => {
  const {
    handleUpdateMultiAttrDSL,
    handleUpdateOtherMultiAttrDSL,
    widgetDisplayName,
  } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const realViews = useMemo(() => {
    return get(targetComponentProps, "viewList", []) as ViewItemShape[]
  }, [targetComponentProps])

  const linkWidgetDisplayName = useMemo(() => {
    return get(targetComponentProps, "linkWidgetDisplayName")
  }, [targetComponentProps])

  const handleUpdateDefaultView = useCallback(
    (attrPath: string, value: string) => {
      const defaultViewIndex = realViews.findIndex((view) => view.key === value)
      let currentIndex = 0
      let currentKey = realViews[currentIndex].key
      if (defaultViewIndex > -1) {
        currentIndex = defaultViewIndex
        currentKey = realViews[currentIndex].key
      }
      handleUpdateMultiAttrDSL?.({
        [attrPath]: value,
        currentIndex,
        currentKey,
      })
      if (linkWidgetDisplayName && Array.isArray(linkWidgetDisplayName)) {
        linkWidgetDisplayName.forEach((name) => {
          handleUpdateOtherMultiAttrDSL?.(name, {
            currentIndex,
            currentKey,
          })
        })
      }
    },
    [
      realViews,
      linkWidgetDisplayName,
      handleUpdateMultiAttrDSL,
      handleUpdateOtherMultiAttrDSL,
    ],
  )

  return <BaseInput {...props} handleUpdateDsl={handleUpdateDefaultView} />
}

ContainerDefaultViewKeySetter.displayName = "ContainerDefaultViewKeySetter"
export default ContainerDefaultViewKeySetter
