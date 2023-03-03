import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyRecordEditorContainerStyle(label: string) {
  return css`
    display: flex;
    padding-right: ${label !== "" ? "16px" : "0"};
    flex-direction: row;
  `
}

export const recordEditorStyle = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`

export const recordStyle = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  & > button {
    color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
    :hover {
      color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
      transition: color 200ms ease-in-out;
    }
  }
`

export const recordKeyStyle = css`
  min-width: 160px;
  flex-grow: 1;
  width: 0;
  .cm-editor {
    border-radius: 8px 0 0 8px;
  }
`

export const recordValueStyle = css`
  margin-left: -1px;
  flex-grow: 1;
  width: 0;
  .cm-editor {
    border-radius: 0;
  }
`

export const recordEditorLabelStyle = css`
  min-width: 160px;
  margin-left: 16px;
  margin-right: 16px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
