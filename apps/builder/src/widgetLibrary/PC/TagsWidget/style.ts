import { css } from "@emotion/react"
import { GAP } from "./constants"
import { Alignment } from "./interface"

export const wrapperContainerStyle = (
  minW: number,
  alignment: Alignment = "flex-start",
  allowWrap?: boolean,
) => css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${alignment};
  gap: ${GAP}px;
  flex-wrap: ${allowWrap ? "wrap" : "nowrap"};
  min-width: ${minW}px;
`
