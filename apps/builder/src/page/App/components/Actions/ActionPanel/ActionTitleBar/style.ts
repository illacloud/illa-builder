import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const actionTitleBarStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  min-height: 48px;
  justify-content: space-between;
  position: relative;
`

export const editableTitleBarWrapperStyle = css`
  width: 280px;
  position: absolute;
  left: calc(50% - 140px);
  .editable-text-container {
    justify-content: center;
    :hover {
      .text-container {
        padding-left: 0;
      }
    }
  }
  .input-container {
    text-align: center;
  }
`

export const actionSuccessBlockStyle = css`
  padding: 0 8px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  margin-right: 8px;
  cursor: pointer;
  background: ${getColor("green", "08")};
  color: ${getColor("green", "03")};
  border-radius: 8px;
`

export const actionFailBlockStyle = css`
  padding: 0 8px;
  display: inline-flex;
  flex-direction: row;
  margin-right: 8px;
  cursor: pointer;
  align-items: center;
  height: 32px;
  background: ${getColor("orange", "08")};
  color: ${getColor("orange", "03")};
  border-radius: 8px;
`

export const actionTextStyle = css`
  font-weight: 500;
  margin-left: 8px;
  margin-right: 20px;
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
`

export function applyOpenStateStyle(openState: boolean): SerializedStyles {
  const transform = openState
    ? css`
        transform: rotate(180deg);
      `
    : css`
        transform: rotate(0deg);
      `

  return css`
    font-size: 12px;
    transition: transform 0.2s ease;
    ${transform};
  `
}

export const tabsContainerStyle = css`
  width: auto;
  padding-left: 0;
  padding-right: 0;
`

export const runResultAndRunContainerStyle = css`
  display: flex;
  gap: 8px;
`
