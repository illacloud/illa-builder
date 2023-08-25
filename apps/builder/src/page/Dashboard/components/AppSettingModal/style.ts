import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix, zIndex } from "@illa-design/react"

export const modalWrapperStyle = css`
  padding: 24px 24px 0;
  width: 100%;
`

export const modalWithMaskWrapperStyle = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const maskStyle = css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
  z-index: -1;
`

export const modalHeaderWrapperStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px 16px;
  width: 486px;
  position: relative;
`

export const modalTitleStyle = css`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: ${getColor("grayBlue", "02")};
  margin: 0;
  text-align: center;
`

export const closeIconHotSpotStyle = css`
  position: absolute;
  right: 0;
  top: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
`

export const gridFormStyle: SerializedStyles = css`
  display: grid;
  gap: 32px;
  padding-bottom: 24px;
`

export const gridFormFieldStyle: SerializedStyles = css`
  display: grid;
  gap: 24px;
`

export const gridItemStyle: SerializedStyles = css`
  display: grid;
  gap: 8px;
`

export const gridValidStyle: SerializedStyles = css``

export const inputDisabledStyle = css`
  &:disabled {
    -webkit-text-fill-color: ${getColor("grayBlue", "05")};
  }
`

export const formLabelStyle: SerializedStyles = css`
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const descriptionStyle: SerializedStyles = css`
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
