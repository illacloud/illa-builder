import { componentPanelCss } from "./style"
import { TabPane, Tabs } from "@illa-design/tabs"
import { ComponentPanel } from "./components/ComponentPanel"
import { ConfigPanel } from "./components/ConfigPanel"

function ComponentsManager() {
  return (
    <div css={componentPanelCss}>
      <Tabs colorScheme="grayBlue" variant="text" defaultActiveKey="Insert">
        <TabPane title="Frame" key="Frame">
          Frame
        </TabPane>
        <TabPane title="Inspect" key="Inspect">
          <ConfigPanel />
        </TabPane>
        <TabPane title="Insert" key="Insert">
          <ComponentPanel />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ComponentsManager
