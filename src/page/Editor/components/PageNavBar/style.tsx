import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const NavBarStyle = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  justify-content: flex-end;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  padding-right: 17px;
`
