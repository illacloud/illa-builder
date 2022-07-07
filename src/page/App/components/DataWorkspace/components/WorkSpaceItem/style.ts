import { css, SerializedStyles } from "@emotion/react"

export const gridCollapseContentStyle: SerializedStyles = css`
  display: grid;
  grid-gap: 4px;
`

export function applyTreeContainerStyle(
  showPadding?: boolean,
): SerializedStyles {
  return css`
    margin-bottom: ${showPadding ? "8px" : "0px"};
    font-size: 0;
  `
}
