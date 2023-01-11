import { SerializedStyles, css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyUserAvatarStyle(background: string): SerializedStyles {
  return css`
    display: inline-block;
    background: #${background};
    color: ${globalColor(`--${illaPrefix}-white-01`)};
    width: 32px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 50%;
    flex-shrink: 0;
  `
}
