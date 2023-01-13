import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const container = css`
  width: 100%;
  max-height: 685px;
  overflow-y: auto;
`

export const footerStyle = css`
  height: 80px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const labelContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  min-width: 176px;
`

export const configItem = css`
  display: flex;
  min-height: 48px;
  align-items: center;
  flex-direction: row;
`

export const sslItem = css`
  display: flex;
  width: 100%;
  padding-left: 24px;
  flex-direction: row;
`

export const divider = css`
  height: 16px;
`

export const hostInputContainer = css`
  display: flex;
  margin-left: 16px;
  margin-right: 24px;
  flex-direction: row;
  width: 100%;
`

export function applyConfigItemLabelText(
  color: string,
  margin?: boolean,
): SerializedStyles {
  let marginLeft = css``
  if (margin) {
    marginLeft = css`
      margin-left: 4px;
    `
  }
  return css`
    font-size: 14px;
    color: ${color};
    font-weight: 500;
    ${marginLeft};
  `
}

export const configItemTip = css`
  font-size: 14px;
  margin-left: 192px;
  padding-bottom: 6px;
  color: ${getColor("grayBlue", "04")};
`

export const connectTypeStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  margin-left: 16px;
`

export const sslStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  margin-left: 8px;
`

export const optionLabelStyle = css`
  height: 38px;
  display: flex;
  font-size: 14px;
  color: ${getColor("grayBlue", "04")};
  align-items: center;
  padding-left: 24px;
`
