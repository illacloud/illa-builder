import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const mainTitleStyle = css`
  display: flex;
`

export const contentAreaStyle = css`
  flex: 1;
  margin-right: 10px;
`

export const titleTextStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  font-weight: 500;
  font-size: 12px;
  margin: 1px 0;
`

export const containerTextStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  font-size: 12px;
`

export const mainTextHeightStyle = css`
  height: 22px;
  line-height: 1.83;
`

export const infoTextHeightStyle = css`
  height: 20px;
  line-height: 1.67;
`
