import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const invalidateMessageCss = css`
  display: flex;
  padding: 8px 0;
  width: 100%;
  align-items: center;
  color: ${globalColor(`--${illaPrefix}-orange-03`)};
  font-size: 14px;

  svg {
    margin-right: 8px;
  }
`
