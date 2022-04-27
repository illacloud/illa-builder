import ColorPicker from "./components/ColorPicker"
import { colorListCss, componentPanelCss } from "./style"

function ComponentsManager() {
  return (
    <div css={componentPanelCss}>
      {/*<ConfigsPanel />*/}
      {/*<ComponentListPanel />*/}
      <div css={colorListCss}>
        <ColorPicker />
        <ColorPicker />
        <ColorPicker />
      </div>
    </div>
  )
}

export default ComponentsManager
