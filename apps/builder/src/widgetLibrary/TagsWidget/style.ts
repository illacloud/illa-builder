import { css } from "@emotion/react"
import { GAP } from "./constants"
import { Alignment } from "./interface"

export const wrapperContainerStyle = (minW: number, allowWrap?: boolean) => css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${GAP}px;
  flex-wrap: ${allowWrap ? "wrap" : "nowrap"};
  min-width: ${minW}px;
`

export const tagsContainerStyle = (alignment: Alignment = "flex-start") => {
  return css`
    display: flex;
    align-items: center;
    justify-content: ${alignment};
    width: 100%;
    height: auto;
  `
}
