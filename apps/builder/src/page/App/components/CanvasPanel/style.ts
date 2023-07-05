import { css } from "@emotion/react"

export const applyScaleContainerStyle = (isEditorMode: boolean) => {
  return css`
    box-sizing: border-box;
    min-width: 148px;
    height: 100%;
    min-height: 280px;
    background: ${isEditorMode ? "#f7f8fa" : "#fff"};
    overflow: auto;
    flex: 1;
    position: relative;
    ${isEditorMode &&
    `* {
      user-select: none;
    }`}
  `
}
