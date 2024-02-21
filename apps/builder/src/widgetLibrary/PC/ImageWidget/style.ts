import { css } from "@emotion/react"
import { HorizontalAlign } from "./interface"

export const imageWrapperContainerStyle = (width: string, height: string) => {
  return css`
    height: ${height};
    width: ${width};
  `
}
export const ImageWrapperStyle = (horizontalAlign?: HorizontalAlign) => {
  let align = "center"
  if (horizontalAlign === "start") {
    align = "flex-start"
  } else if (horizontalAlign === "end") {
    align = "flex-end"
  }
  return css`
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: ${align};
  `
}
