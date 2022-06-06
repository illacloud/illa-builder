import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const itemStyle = css`
  display: flex;
  align-items: center;
  height: 24px;
  min-width: 287px;
`

export const contentStyle = css`
  display: inline-block;
  margin: 0 8px;
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  flex: 1;
`

export const typeStyle = css`
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`
