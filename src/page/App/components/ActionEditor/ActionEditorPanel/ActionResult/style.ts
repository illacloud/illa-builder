import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const resHeaderStyle = css`
  height: 56px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  display: flex;
  align-items: center;
  padding: 16px;
`

export const resStatusIconStyle = css`
  width: 24px;
  height: 24px;
`

export const resSuccessStatusIconStyle = css`
  & path {
    fill: ${globalColor(`--${illaPrefix}-green-07`)};

    &:last-child {
      fill: ${globalColor(`--${illaPrefix}-green-03`)};
    }
  }
`
export const resFailStatusIconStyle = css``

export const resTitleStyle = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  margin-left: 10px;
  flex: 1;
`

export const resContentStyle = css`
  overflow: auto;
  & .CodeMirror {
    border: 0;
  }
`

export const resCloseIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
  cursor: pointer;
  padding: 8px;
  font-size: 14px;
  width: 14px;
  height: 14px;
  box-sizing: content-box;
  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  }
`

export function applyResContainerStyle(maxHeight: number): SerializedStyles {
  return css`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 182px;
    max-height: ${maxHeight}px;
  `
}
