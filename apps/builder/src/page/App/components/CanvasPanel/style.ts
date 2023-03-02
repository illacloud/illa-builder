import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const applyScaleContainerStyle = (isEditorMode: boolean) => {
  return css`
    box-sizing: border-box;
    min-width: 148px;
    height: 100%;
    background: ${isEditorMode ? "#f7f8fa" : "#fff"};
    overflow: auto;
    flex: 1;
    position: relative;
  `
}

export const messageWrapperStyle = css`
  position: absolute;
  top: 16px;
  left: 0;
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
  gap: 8px;
`
