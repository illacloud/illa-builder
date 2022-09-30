import { TabPane, Tabs } from "@illa-design/tabs"
import { useTranslation } from "react-i18next"
import { FC, HTMLAttributes, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getSelectedComponents } from "@/redux/config/configSelector"
import { componentPanelCss } from "./style"
import { FocusManager } from "@/utils/focusManager"
import { ConfigPanel } from "@/page/App/components/ConfigPanel"
import { ComponentPanel } from "@/page/App/components/ComponentPanel"

export const ComponentsManager: FC<HTMLAttributes<HTMLDivElement>> = (
  props,
) => {
  const { t } = useTranslation()

  const [activeKey, setActiveKey] = useState("Insert")

  const selectedDisplayNames = useSelector(getSelectedComponents)

  useEffect(() => {
    if (selectedDisplayNames.length > 0) {
      setActiveKey("Inspect")
    } else {
      setActiveKey("Insert")
    }
  }, [selectedDisplayNames])

  return (
    <div
      className={props.className}
      css={componentPanelCss}
      onClick={() => {
        FocusManager.switchFocus("components")
      }}
    >
      <Tabs
        variant="text"
        activeKey={activeKey}
        colorScheme="grayBlue"
        onChange={(key) => {
          setActiveKey(key)
        }}
      >
        <TabPane title={t("editor.inspect.tab_title")} key="Inspect">
          <ConfigPanel />
        </TabPane>
        <TabPane title={t("editor.widget_picker.tab_title")} key="Insert">
          <ComponentPanel />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ComponentsManager

ComponentsManager.displayName = "ComponentsManager"
