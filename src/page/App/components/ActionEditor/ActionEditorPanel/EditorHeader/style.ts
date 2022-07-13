import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const headerStyle = css`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  height: 48px;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
`

export const moreBtnStyle = css`
  margin-right: 8px;
`

export const moreBtnMenuStyle = css`
  padding: 8px 0;
  width: 180px;
  box-shadow: 0 2px 16px 0 ${globalColor(`--${illaPrefix}-blackAlpha-05`)};
`
