import chroma from "chroma-js"
import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyTitleContainerStyle(hoverable: boolean): SerializedStyles {
  const hoverStyle = css`
    &:hover {
      cursor: pointer;
      background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
      padding: 0 16px;

      & > svg {
        opacity: 1;
      }
    }
  `
  return css`
    display: flex;
    align-items: center;
    width: 280px;
    border-radius: 8px;
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    transition: all 0.2s ease-in-out;
    margin: 0 19px 0 16px;
    ${hoverable && hoverStyle}
  `
}

export const titleInputContainerStyle = css`
  width: 280px;
  max-width: 280px;
  border-radius: 8px;
  box-sizing: border-box;
  height: 32px;
  margin: 0 19px 0 16px;
`

export const titleInputStyle = css`
  width: 280px !important;

  & > span {
    border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)}!important;
    box-shadow: 0 0 8px 0
      ${chroma(globalColor(`--${illaPrefix}-techPurple-01`))
    .alpha(0.2)
    .hex()};
  }
`

export const titleStyle = css`
  display: inline-block;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const titleEditIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  transition: all 0.2s ease-in-out;
  opacity: 0;
`
