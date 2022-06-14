import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const colorListCss = css`
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  border-radius: 4px;
  margin: 10px 20px;
  flex-grow: 1;
  padding: 12px 0;
  box-sizing: border-box;
`

export const componentPanelCss = css`
  width: 100%;
  display: inline-flex;
  justify-content: center;
`
