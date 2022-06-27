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

const rateScale = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
export const tableStyle = css`
  thead tr th {
    background: ${globalColor(`--${illaPrefix}-white-01`)};
  }
  tr {
    height: 56px;
  }
  tbody tr {
    cursor: pointer;
    &: hover {
      background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
      [title="editButton"] {
        animation: 0.15s ${rateScale} ease-in-out forwards;
      }
    }
  }
  tbody tr td {
    background: inherit;
  }
`
