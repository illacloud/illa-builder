import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

export const gridFormFieldStyle: SerializedStyles = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`

export const tipTextStyle: SerializedStyles = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
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

export const avatarStyle = css`
  width: 120px;
  height: 120px;
  margin-right: 64px;
  font-size: 50px;
  flex: none;
`

export const editLabelStyle = css`
  margin-right: 64px;
  margin-top: 8px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export const contentContainerStyle = css`
  display: flex;
  justify-content: center;
  gap: 64px;
`

export const outerContainerStyle = css`
  display: flex;
  justify-content: center;
`

export const formLabelStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  line-height: 1;
`

export const formContainerStyle = css`
  width: 600px;
`
