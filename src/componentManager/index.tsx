// import ConfigsPanel from './configs';
// import ComponentListPanel from './componentList';
import ColorPicker from "@componentManager/components/ColorPicker"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

const colorListCss = css`
  border: 1px solid ${globalColor(`--${illaPrefix}-grayblue-09`)};
  border-radius: 4px;
  margin: 10px 20px;
  flex-grow: 1;
  padding: 12px 0;
  box-sizing: border-box;
`

const componentPanelCss = css`
  width: 100%;
  display: inline-flex;
  justify-content: center;
`

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
