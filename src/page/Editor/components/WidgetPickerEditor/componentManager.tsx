import ColorPicker from "./components/ColorPicker"
import { colorListCss, componentPanelCss } from "./style"
import { TabPane, Tabs } from "@illa-design/tabs"
import { ComponentPanel } from "@/page/Editor/components/WidgetPickerEditor/components/ComponentPanel"
import { ConfigPanel } from "@/page/Editor/components/WidgetPickerEditor/components/ConfigPanel"

function ComponentsManager() {
  return (
    <div css={componentPanelCss}>
      {/*<ConfigsPanel />*/}
      {/*<ComponentListPanel />*/}
      {/*<div css={colorListCss}>*/}
      {/*  <ColorPicker />*/}
      {/*  <ColorPicker />*/}
      {/*  <ColorPicker />*/}
      {/*</div>*/}
      <Tabs variant={"text"} defaultActiveKey={"Insert"}>
        <TabPane title={"Frame"} key={"Frame"}>
          Frame
        </TabPane>
        <TabPane title={"Inspect"} key={"Inspect"}>
          <ConfigPanel />
        </TabPane>
        <TabPane title={"Insert"} key={"Insert"}>
          <ComponentPanel />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default ComponentsManager
