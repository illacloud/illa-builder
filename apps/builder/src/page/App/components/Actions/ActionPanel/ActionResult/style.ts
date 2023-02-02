import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const resultContainerStyle = css`
  width: 100%;
  min-width: 700px;
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  z-index: 2;
`

export function applyMaxHeightStyle(h?: number) {
  return css`
    ${h ? `max-height: ${h}px;` : ""};
  `
}

export const resultWrapperStyle = css`
  display: flex;
  align-items: center;
  flex: 1;
  line-height: 22px;
  padding: 9px 16px;
`

export const errorResultWrapperStyle = css`
  ${resultWrapperStyle};
  background: ${globalColor(`--${illaPrefix}-orange-07`)};
`

export const successResultWrapperStyle = css`
  ${resultWrapperStyle};
  font-weight: 500;
  justify-content: space-between;
  background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
`

export const resultSuccessLeftContainer = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`

export const errorIconStyle = css`
  margin-right: 10px;
  color: ${globalColor(`--${illaPrefix}-red-03`)};
`

export const successIconStyle = css`
  margin-right: 10px;
  color: ${globalColor(`--${illaPrefix}-green-03`)};
`

export const resCloseIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  cursor: pointer;
  //padding: 8px;
  font-size: 14px;
  width: 14px;
  height: 14px;
  box-sizing: content-box;

  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  }
`
export const codeStyle = css`
  overflow: scroll;
`

export const customerCodeStyle = css`
  border: none;
  border-radius: 0;
  background-color: ${getColor("white", "01")};
`
