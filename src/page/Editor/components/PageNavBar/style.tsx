import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const navBarStyle = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
  padding: 6px 16px;
`

export const projectInfoStyle = css`
  display: flex;
  align-items: center;
`
export const informationStyle = css`
  margin-left: 24px;
`
