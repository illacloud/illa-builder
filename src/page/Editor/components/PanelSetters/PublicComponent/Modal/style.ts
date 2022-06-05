import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const headerCss = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
  font-size: 16px;
  font-weight: 500;

  span {
    display: flex;
    align-items: center;
  }
`

export const closeIconCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14px;
  height: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  cursor: pointer;
`
