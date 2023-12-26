import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const previewButtonGroupWrapperStyle = css`
  display: flex;
  pointer-events: auto;
  position: relative;
  align-items: center;
  height: 32px;
`

export const appSizeContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const appSizeIconContainerStyle = css`
  width: 32px;
  height: 32px;
  display: flex;
  cursor: pointer;
`

export const appSizeIconStyle = css`
  margin: auto;
  height: 100%;
  display: flex;
  & > svg {
    width: 16px;
    height: 16px;
    margin: auto;
  }
`

export const getAppSizeIconSelectedStyle = (
  active: boolean,
): SerializedStyles => {
  if (active) {
    return css`
      box-shadow: inset 0px -2px 0px ${getColor("grayBlue", "02")};
    `
  }
  return css``
}
