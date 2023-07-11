import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const changeHorizontalLayoutBarWrapperStyle = (
  direction: "left" | "right",
) => css`
  position: absolute;
  ${direction}: -9px;
  flex-direction: ${direction === "left" ? "row-reverse" : "row"};
  display: flex;
  align-items: center;
  height: calc(100% - 8px);
  cursor: pointer;
  z-index: 10;
`

export const changeHorizontalLayoutLeftIconStyle = (
  direction: "left" | "right",
) => css`
  transform: rotate(${direction === "left" ? "-90deg" : "90deg"});
`

export const changeLayoutHorizontalBarStyle = css`
  width: 2px;
  height: 100%;
  background-color: ${getColor("techPurple", "01")};
`
