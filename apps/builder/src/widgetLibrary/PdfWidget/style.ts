import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { ToolButtonShape } from "@/widgetLibrary/PdfWidget/button"

export const pdfWrapperStyle = css`
  width: 100%;
  height: 100%;
`

export const pdfContainerStyle = css`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid ${getColor("grayBlue", "08")};
`
export const fullPageStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const pdfStyle = css`
  width: 100%;
  height: 100%;
  overflow: auto;
  scroll-snap-type: y mandatory;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  background-color: ${getColor("grayBlue", "09")};
`

export const documentInitStyle = css`
  margin: 0 auto;

  .react-pdf__message {
    height: 100%;
  }
`

export const toolBarStyle = css`
  background: ${getColor("grayBlue", "02")};
  text-align: end;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 8px;
  flex: 0 0 auto;
`

export const pageStyle = css`
  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`

export const applyHiddenStyle = (hidden: boolean): SerializedStyles => {
  return css`
    visibility: ${hidden ? "hidden" : "visible"};
  `
}

// button

export const buttonStyle = css`
  color: ${getColor("white", "01")};
  transition: color 200ms ease-in-out, background-color 200ms ease-in-out;
  vertical-align: middle;
  white-space: nowrap;
  outline: none;
  border: 0;
  background-color: transparent;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px;
`

export const buttonIconStyle = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
`

export function applyCursor(loading?: boolean): SerializedStyles {
  if (loading) {
    return css`
      cursor: default;

      &:disabled {
        cursor: not-allowed;
        background-color: transparent;
      }
    `
  } else {
    return css`
      cursor: pointer;

      &:disabled {
        cursor: not-allowed;
      }
    `
  }
}

export function applyShape(shape: ToolButtonShape): SerializedStyles {
  if (shape === "round") {
    return css`
      border-radius: 50%;
    `
  } else {
    return css`
      border-radius: 8px;
    `
  }
}
