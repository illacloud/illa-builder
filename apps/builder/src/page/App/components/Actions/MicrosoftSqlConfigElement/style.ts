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

export const divider = css`
  height: 16px;
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
  white-space: pre-line;
  color: ${getColor("grayBlue", "04")};
  font-weight: 400;
  margin-left: 192px;
  padding-bottom: 8px;
  padding-left: 24px;
  line-height: 22px;
`
