import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, Suspense, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { SimpleTabs, getRenderBody } from "@/components/Tabs"
import { COMPONENT_MANAGER_TABS } from "@/components/Tabs/constant"
import { getSelectedComponentDisplayNames } from "@/redux/config/configSelector"
import { getCurrentPageDisplayName } from "@/redux/currentApp/executionTree/executionSelector"
import { FocusManager } from "@/utils/focusManager"
import { trackInEditor } from "@/utils/mixpanelHelper"
import WidgetLoading from "@/widgetLibrary/PublicSector/WidgetLoading"
import { containerStyle } from "./style"

export const ComponentsManager: FC = () => {
  const [activeKey, setActiveKey] = useState("Insert")

  const selectedDisplayNames = useSelector(getSelectedComponentDisplayNames)
  const currentPageDisplayName = useSelector(getCurrentPageDisplayName)
  const prevPageDisplayName = useRef<string>(currentPageDisplayName)
  const isClickChange = useRef<boolean>(false)

  useEffect(() => {
    if (!isClickChange.current) {
      if (selectedDisplayNames.length > 0) {
        setActiveKey("Inspect")
      } else {
        if (activeKey === "Page") {
          setActiveKey("Page")
        }
        if (activeKey === "Inspect") {
          setActiveKey("Insert")
        }
      }
    }
    if (prevPageDisplayName.current !== currentPageDisplayName) {
      prevPageDisplayName.current = currentPageDisplayName
    }
    isClickChange.current = false
  }, [activeKey, currentPageDisplayName, selectedDisplayNames])

  const handleClickChangeTab = (activeKey: string) => {
    switch (activeKey) {
      case "Page":
        FocusManager.switchFocus("page_config")
        break
      case "Inspect":
        FocusManager.switchFocus("components_config")
        break
      case "Insert":
        FocusManager.switchFocus("widget_picker")
        break
    }
    setActiveKey(activeKey)
    isClickChange.current = true
    trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "right_tab",
      parameter2: activeKey,
    })
  }

  return (
    <div css={containerStyle} data-onboarding-comp="componentsManager">
      <SimpleTabs
        items={COMPONENT_MANAGER_TABS}
        activeKey={activeKey}
        handleClickChangeTab={handleClickChangeTab}
      />
      <Suspense fallback={<WidgetLoading />}>
        {getRenderBody(activeKey, COMPONENT_MANAGER_TABS)}
      </Suspense>
    </div>
  )
}

export default ComponentsManager

ComponentsManager.displayName = "ComponentsManager"
