import { css } from "@emotion/react"

export function applyColorSetterStyle(isSingleRow = false) {
  return css`
    width: ${isSingleRow ? "100%" : "154px"};
  `
}
