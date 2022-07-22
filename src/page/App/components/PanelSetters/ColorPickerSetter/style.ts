import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyColorSetterStyle(isSingleRow: boolean = false) {
  return css`
    width: ${isSingleRow ? "100%" : "154px"};
  `
}

export const titleStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-size: 12px;
  font-weight: 500;
`

export const closeIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-size: 14px;
  cursor: pointer;
`
