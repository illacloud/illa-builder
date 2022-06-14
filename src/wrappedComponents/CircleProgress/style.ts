import { css } from "@emotion/react"
import { Alignment } from "./interface"

export function applyContainerCss(alignment: Alignment = "center") {
  return css`
    display: inline-flex;
    flex-direction: column;
    align-items: ${alignment};
    width: 400px; // todo@aoao wrapper的宽度
  `
}
