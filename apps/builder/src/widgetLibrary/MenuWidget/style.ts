import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import {
  MenuHorizontalAlign,
  MenuMode,
} from "@/widgetLibrary/MenuWidget/interface"

export const menuItemLabelStyle = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

export const applyMenuItemIconStyle = (mode?: MenuMode): SerializedStyles => {
  const modeStyle =
    mode === "horizontal"
      ? css`
          margin-right: 8px;
        `
      : css`
          margin-right: 16px;
        `
  return css`
    width: 14px;
    height: 14px;
    ${modeStyle};
  `
}
