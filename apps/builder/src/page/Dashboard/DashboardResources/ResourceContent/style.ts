import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export function applyTableTextStyle(highlight: boolean): SerializedStyles {
  return css`
    font-family: "Helvetica Neue", sans-serif;
    font-size: 14px;
    color: ${highlight
      ? getColor("grayBlue", "02")
      : getColor("grayBlue", "02")};
  `
}

export const resourceNameStyle = css`
  max-width: 312px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const hoverStyle = css`
  overflow: auto;
  min-height: 150px;
  padding: 0 15%;

  &::-webkit-scrollbar {
    display: none;
  }

  tr {
    &:hover {
      .dashboardResourceEditButton {
        visibility: visible;
      }
    }
  }
`
