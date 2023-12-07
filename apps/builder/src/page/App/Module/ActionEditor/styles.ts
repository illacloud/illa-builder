import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export function applyActionEditorStyle(h: number) {
  return css`
    position: relative;
    width: 100%;
    height: ${h}px;
  `
}

export const contentContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100%;
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

export const configItem = css`
  display: flex;
  height: 48px;
  align-items: center;
  flex-direction: row;
  padding-left: 24px;
`

export const configItemTip = css`
  font-size: 14px;
  font-weight: 400;
  margin-left: 192px;
  padding-bottom: 8px;
  line-height: 22px;
  padding-left: 24px;
  color: ${getColor("grayBlue", "04")};
`

export const connectType = css`
  display: flex;
  height: 38px;
  align-items: center;
  padding-left: 24px;
`

export const labelContainer = css`
  display: flex;
  justify-content: end;
  min-width: 176px;
`

export const connectTypeStyle = css`
  font-size: 14px;
  height: 22px;
  display: flex;
  align-items: center;
  color: ${getColor("grayBlue", "02")};
  margin-left: 16px;
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

export const errorMsgStyle: SerializedStyles = css`
  position: relative;
  font-size: 14px;
  padding-left: 24px;
  line-height: 22px;
  color: ${getColor("orange", "03")};
`

export const errorIconStyle: SerializedStyles = css`
  position: absolute;
  font-size: 16px;
  line-height: 0;
  top: 3px;
  left: 0;
`

export const privateKeyItem = css`
  display: flex;
  width: 100%;
  padding-top: 8px;
  padding-left: 24px;
  align-items: flex-start;
`

export const getOAuthStatusContentStyle = (isSuccess: boolean) => {
  return css`
    width: 100%;
    padding: 9px 16px;
    display: flex;
    gap: 8px;
    height: 40px;
    background: ${isSuccess
      ? getColor("green", "08")
      : getColor("orange", "08")};
    border-radius: 4px;
    align-items: center;
  `
}

export const oAuthStatusContainerStyle = css`
  width: 100%;
  padding: 8px 24px;
`

export const oAuthErrorIconStyle: SerializedStyles = css`
  font-size: 16px;
  color: ${getColor("orange", "03")};
`

export const agentActionStyle = (size: string) => css`
  width: ${size};
  height: ${size};
  flex-shrink: 0;
  border-radius: 4px;
`
