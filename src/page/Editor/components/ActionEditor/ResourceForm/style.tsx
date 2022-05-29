import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const modalCss = css`
  width: 696px;
  border-radius: 8px;
`

export const titleCss = css`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.4;
  padding: 24px 24px 16px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  text-align: center;
`

export const closeIconCss = css`
  position: absolute;
  line-height: 0;
  font-size: 14px;
  top: 32.8px;
  right: 30.8px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;
`
