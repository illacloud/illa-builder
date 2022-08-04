import { css } from "@emotion/react"

export function applyColorSetterStyle(isSingleRow: boolean = false) {
  return css`
    width: ${isSingleRow ? "100%" : "154px"};
  `
}
