import { css, SerializedStyles } from "@emotion/react"

export const gridCollapseContentStyle: SerializedStyles = css`
  display: grid;
  grid-gap: 4px;
`

export function applyTreeContainerStyle(
  showPadding?: boolean,
): SerializedStyles {
  return css`
    padding-bottom: ${showPadding ? "16px" : "0"};
    font-size: 0;
  `
}
