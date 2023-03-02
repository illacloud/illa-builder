import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const containerStyle: SerializedStyles = css`
  display: flex;
  width: 100vw;
  height: 100vh;
`

export const contentStyle: SerializedStyles = css`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 40px;
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
