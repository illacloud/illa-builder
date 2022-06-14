import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const modalStyle = css`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 0 16px 16px;
  background: ${globalColor(`--${illaPrefix}-white-01`)};
  box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  font-size: 14px;
`
