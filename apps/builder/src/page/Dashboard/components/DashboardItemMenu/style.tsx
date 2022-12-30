import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyTriggerContentItemStyle(
  color: string,
  hoverColor?: string,
): SerializedStyles {
  return css`
    cursor: pointer;
    padding: 6px 16px;
    color: ${color};
    min-width: 184px;
    font-size: 14px;

    &:hover {
      background: ${globalColor(`--${illaPrefix}-techPurple-07`)};
      color: ${hoverColor || color};
    }
  `
}
