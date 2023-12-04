import { css } from "@emotion/react"
import { HorizontalAlign } from "./interface"

export const imageWrapperContainerStyle = (
  horizontalAlign?: HorizontalAlign,
) => {
  let align = "center"
  if (horizontalAlign === "start") {
    align = "flex-start"
  } else if (horizontalAlign === "end") {
    align = "flex-end"
  }
  return css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${align};
  `
}
export const ImageWrapperStyle = css`
  width: 100%;
  height: 100%;
  overflow: hidden;
`
