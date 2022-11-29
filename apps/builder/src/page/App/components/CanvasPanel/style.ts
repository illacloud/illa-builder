import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyScaleContainerStyle(scale: number): SerializedStyles {
  return css`
    transform: scale(${scale / 100});
    transform-origin: 50% 0;
    background: ${globalColor(`--${illaPrefix}-white-01`)};
    box-sizing: border-box;
    min-width: 148px;
    overflow-y: hidden;
    height: 100%;
    position: relative;
  `
}

export const messageWrapperStyle = css`
  top: 16px;
  position: absolute;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  z-index: 100;
  pointer-events: none;
`

export const messageStyle = css`
  padding: 9px 16px;
  background-color: ${globalColor(`--${illaPrefix}-white-01`)};
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 2px;
  line-height: 22px;
  display: flex;
  align-items: center;
`
