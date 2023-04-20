import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export function applyConfigItemContainer(hasTextarea: boolean) {
  if (hasTextarea) {
    return css`
      display: flex;
      width: 100%;
      flex-direction: row;
      padding-left: 24px;
    `
  } else {
    return css`
      display: flex;
      min-height: 48px;
      align-items: center;
      flex-direction: row;
      padding-left: 24px;
    `
  }
}

export const sslStyle = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  margin-left: 8px;
`

export const configItemTip = css`
  font-size: 14px;
  color: ${getColor("grayBlue", "04")};
  font-weight: 400;
  margin-left: 192px;
  padding: 0 24px 8px 24px;
  line-height: 22px;
  min-height: 30px;
  white-space: normal;
`

export const labelContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: end;
  min-width: 176px;
  width: 176px;
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

export const hostInputContainer = css`
  display: flex;
  margin-left: 16px;
  margin-right: 24px;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 8px;
`
