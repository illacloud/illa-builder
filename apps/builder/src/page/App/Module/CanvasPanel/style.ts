import { css } from "@emotion/react"

export const applyScaleContainerStyle = (
  isEditorPreview: boolean,
  isEditorMode: boolean,
) => {
  return css`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    min-width: 148px;
    min-height: 280px;
    background: ${isEditorPreview ? "#f7f8fa" : "#fff"};
    overflow: auto;
    flex: 1;
    position: relative;
    ${isEditorMode &&
    `* {
      user-select: none;
    }`}
  `
}

export const applyMobileContainerStyle = css`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  background: #f7f8fa;
`
