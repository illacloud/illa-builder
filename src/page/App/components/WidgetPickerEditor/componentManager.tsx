import { componentPanelCss } from "./style"
import { TabPane, Tabs } from "@illa-design/tabs"
import { ComponentPanel } from "./components/ComponentPanel"
import { ConfigPanel } from "./components/ConfigPanel"
import { useTranslation } from "react-i18next"

function ComponentsManager() {
  const { t } = useTranslation()

  return (
    <div css={componentPanelCss}>
      <Tabs variant="text" defaultActiveKey="Insert">
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
