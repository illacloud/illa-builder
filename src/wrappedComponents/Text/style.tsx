import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { colorSchemes } from "../colorSchemeOptions"

export const textContainerCss = css`
  display: inline-flex;
  width: 100%;
  height: 100%;

  p {
    margin: 0;
  }
`

export function applyTextCss(
  textColor?: string,
  linkColor?: string,
  backgroundColor?: string,
): SerializedStyles {
  return css`
    color: ${globalColor(`--${illaPrefix}-${textColor}-05`)};
    background-color: ${backgroundColor &&
    colorSchemes.includes(backgroundColor)
      ? globalColor(`--${illaPrefix}-${backgroundColor}-05`)
      : "transparent"};
    ${applyLinkCss(linkColor)}
  `
}

export function applyLinkCss(linkColor?: string): SerializedStyles {
  return linkColor
    ? css`
        a {
          cursor: pointer;
          color: ${globalColor(`--${illaPrefix}-${linkColor}-05`)};
        }
      `
    : css``
}
