import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const resStatusStyle = css`
  background-color: ${globalColor(`--${illaPrefix}-green-07`)};
  color: ${globalColor(`--${illaPrefix}-green-03`)};
  border-radius: 50%;
  font-size: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`

export const resTitleStyle = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-gray-01`)};
`

export const resAlertBgcStyle = css`
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
`

export const resCloseIconStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`

export function applyResContainerStyle(maxHeight: number): SerializedStyles {
  return css`
    min-height: 182px;
    max-height: ${maxHeight}px;
  `
}
