import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

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
  height: 48px;
  align-items: center;
  flex-direction: row;
  padding-left: 24px;
`

export const connectType = css`
  display: flex;
  height: 38px;
  align-items: center;
  flex-direction: row;
  padding-left: 24px;
`

export const privateKeyItem = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  padding-top: 8px;
  padding-left: 24px;
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
  font-weight: 400;
  margin-left: 192px;
  padding-bottom: 8px;
  padding-left: 24px;
  height: 30px;
  color: ${getColor("grayBlue", "04")};
`

export const linkItem = css`
  height: 22px;
`

export const connectTypeStyle = css`
  font-size: 14px;
  height: 22px;
  display: flex;
  align-items: center;
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
  font-weight: 500;
  padding: 8px 24px;
  color: ${getColor("grayBlue", "04")};
  align-items: center;
`

export const errorMsgStyle: SerializedStyles = css`
  position: relative;
  font-size: 14px;
  padding-left: 24px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-orange-03`)};
`

export const errorIconStyle: SerializedStyles = css`
  position: absolute;
  font-size: 16px;
  line-height: 0;
  top: 3px;
  left: 0;
`
