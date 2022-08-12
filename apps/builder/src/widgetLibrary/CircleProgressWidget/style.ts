import { css } from "@emotion/react"
import { Alignment } from "./interface"

export function applyContainerCss(alignment: Alignment = "center") {
  return css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: ${alignment};
    align-items: center;
  `
}
