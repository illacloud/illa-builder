import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"

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
  height: auto;

  .ͼ1.cm-editor {
    border-radius: 8px 0 0 8px;
  }
`

export const recordValueStyle = css`
  margin-left: -1px;
  flex-grow: 1;
  width: 0;
  height: auto;

  .ͼ1.cm-editor {
    border-radius: 0;
  }
`

export function applyRecordValueStyle(fillOnly?: boolean): SerializedStyles {
  const fillStyle = fillOnly
    ? css`
        .ͼ1.cm-editor {
          border-radius: 0 8px 8px 0;
        }
      `
    : css`
        .ͼ1.cm-editor {
          border-radius: 0;
        }
      `

  return css`
    margin-left: -1px;
    flex-grow: 1;
    width: 0;
    height: auto;
    ${fillStyle};
  `
}

export const recordEditorLabelStyle = css`
  min-width: 160px;
  margin-left: 16px;
  margin-right: 16px;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  font-size: 14px;
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const subLabelStyle = css`
  line-height: 20px;
  color: ${getColor("techPurple", "03")};
  font-size: 12px;
  cursor: pointer;
`
