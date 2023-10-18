import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const gridFormFieldStyle: SerializedStyles = css`
  display: inline-flex;
  flex-direction: column;
  gap: 24px;
`

export const prevIconStyle = css`
  width: 12px;
  height: 12px;
  font-size: 12px;
  flex: none;
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
export const gridItemStyle: SerializedStyles = css`
  display: grid;
  gap: 8px;
`
export const formLabelStyle = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
`

export const innerContainerStyle = css`
  display: flex;
  justify-content: center;
`

export const formContainerStyle = css`
  display: flex;
  width: 600px;
  gap: 40px;
  flex-direction: column;
`
