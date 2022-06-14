import { SerializedStyles } from "@emotion/serialize"
import { css } from "@emotion/react"
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
