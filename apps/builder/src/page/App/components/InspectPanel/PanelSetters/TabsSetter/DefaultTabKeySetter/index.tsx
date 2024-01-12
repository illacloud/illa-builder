import { get } from "lodash-es"
import { FC, useCallback } from "react"
import { useSelector } from "react-redux"
import { ViewItemShape } from "@/page/App/components/InspectPanel/PanelSetters/ContainerSetter/ViewsSetter/interface"
import BaseInput from "@/page/App/components/InspectPanel/PanelSetters/InputSetter/BaseInput"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { RootState } from "@/store"
import { TabsDefaultKeySetterProps } from "./interface"

const TabsDefaultKeySetter: FC<TabsDefaultKeySetterProps> = (props) => {
  const { handleUpdateMultiAttrDSL, widgetDisplayName } = props

  const targetComponentProps = useSelector<RootState, Record<string, any>>(
    (rootState) => {
      const executionTree = getExecutionResult(rootState)
      return get(executionTree, widgetDisplayName, {})
    },
  )

  const tabList = get(targetComponentProps, "tabList", []) as ViewItemShape[]

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

  return <BaseInput {...props} handleUpdateDsl={handleUpdateDefaultTab} />
}

TabsDefaultKeySetter.displayName = "TabsDefaultKeySetter"
export default TabsDefaultKeySetter
