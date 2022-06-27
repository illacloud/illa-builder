import { SerializedStyles } from "@emotion/serialize"
import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const triggerContentContainerCss: SerializedStyles = css`
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: column;
`

export function applyTriggerContentItemStyle(
  color: string,
  hoverColor?: string,
): SerializedStyles {
  return css`
    cursor: pointer;
    padding: 5px 16px;
    color: ${color};
    min-width: 184px;
    font-size: 14px;

    &:hover {
      background: ${globalColor(`--${illaPrefix}-techPurple-07`)};
      color: ${hoverColor || color};
    }
  `
}

export const modalStyle = css`
  width: 520px;
`

export const closeIconStyle = css`
  position: absolute;
  top: 21px;
  right: 18px;
`
