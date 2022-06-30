import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const itemStyle = css`
  display: flex;
  align-items: center;
  height: 24px;
  min-width: 287px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: ${globalColor(`--${illaPrefix}-techPurple-07`)};
  }
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
