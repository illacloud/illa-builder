import { css } from "@emotion/react"

export const applyPanelDividerCss = (hasMargin: boolean) => {
  return css`
    padding: 0 16px;
    margin-top: ${hasMargin ? "8px" : 0};
  `
}
