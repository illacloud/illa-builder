import { css } from "@emotion/react"
import { SerializedStyles } from "@emotion/serialize"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const NavBarStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayblue-08`)};
`
