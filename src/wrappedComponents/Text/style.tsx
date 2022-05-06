import { css, SerializedStyles } from "@emotion/react"

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
    color: ${textColor};
    background-color: ${backgroundColor ?? "inherit"};
    ${applyLinkCss(linkColor)}
  `
}

export function applyLinkCss(linkColor?: string): SerializedStyles {
  return linkColor
    ? css`
        a {
          cursor: pointer;
          color: ${linkColor};
        }
      `
    : css``
}
