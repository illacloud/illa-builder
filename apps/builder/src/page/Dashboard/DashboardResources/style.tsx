import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyTableTextStyle(highlight: boolean): SerializedStyles {
  return css`
    font-family: "Helvetica Neue", sans-serif;
    font-size: 14px;
    color: ${highlight
      ? globalColor(`--${illaPrefix}-grayBlue-02`)
      : globalColor(`--${illaPrefix}-grayBlue-04`)};
  `
}

export const hoverStyle = css`
  tr {
    &:hover {
      .dashboardResourceEditButton {
        visibility: visible;
      }
    }
  }
`
