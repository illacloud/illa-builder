import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyRecordEditorContainerStyl(label: string) {
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
`

export const recordKeyStyle = css`
  min-width: 160px;
`

export const recordValueStyle = css`
  width: 0;
  flex-grow: 1;
`

export const recordNewButton = css`
  margin-bottom: 8px;
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
