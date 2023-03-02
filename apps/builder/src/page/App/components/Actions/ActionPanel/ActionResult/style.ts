import { SerializedStyles, css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const actionResultContainerStyle = css`
  padding-top: 120px;
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: none;
  justify-content: end;
  height: 100%;
`

export function applyActionContentContainerStyle(
  renderResult: boolean,
): SerializedStyles {
  return css`
    visibility: ${renderResult ? "visible" : "hidden"};
    position: relative;
    pointer-events: auto;
    z-index: 10;
  `
}

export const alertBarStyle = css`
  width: 100%;
  background: ${getColor("grayBlue", "09")};
  height: 40px;
  display: flex;
  flex-direction: row;
  padding: 0 16px;
  align-items: center;
`

export const alertTextStyle = css`
  font-weight: 500;
  flex-grow: 1;
  font-size: 14px;
  margin-left: 8px;
`

export const customerCodeStyle = css`
  border: none;
  border-radius: 0;
  background-color: ${getColor("white", "01")};

  > .cm-editor {
    border: none;
    border-radius: 0;

    & > .cm-scroller {
      & > .cm-gutters {
        border-radius: 0;
      }
    }
  }
`
