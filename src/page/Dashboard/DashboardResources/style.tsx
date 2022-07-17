import { SerializedStyles } from "@emotion/serialize"
import { css, keyframes } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const resourceContainerStyle: SerializedStyles = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  margin: 0 auto;
  width: 67%;
  height: 100%;
`

export const nameIconStyle = css`
  font-size: 24px;
  margin-right: 8px;
`
export const tableMainTextStyle = css`
  font-weight: 500;
`
export const tableNormalTextStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`
export const tableInfoTextStyle = css`
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`
export const tableStyle = css`
  thead tr th {
    background: ${globalColor(`--${illaPrefix}-white-01`)};
    font-weight: 500;
  }
  tr {
    height: 56px;
    border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
  tbody tr:last-child {
    border-bottom: none;
  }
  tbody tr {
    cursor: pointer;
    &: hover {
      background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
      [title="editButton"] {
        opacity: 1;
      }
    }
  }
  tbody tr td {
    background: inherit;
  }
`
