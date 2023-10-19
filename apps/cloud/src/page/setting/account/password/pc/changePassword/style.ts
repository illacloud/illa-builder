import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const gridFormFieldStyle: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`

export const passwordFormContainerStyle = css`
  display: flex;
  width: 600px;
  justify-content: center;
`

export const formTitleStyle: SerializedStyles = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 26px;
  color: ${globalColor(`--${illaPrefix}-gray-02`)};
  margin-bottom: 16px;
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
  display: flex;
  flex-direction: column;
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
