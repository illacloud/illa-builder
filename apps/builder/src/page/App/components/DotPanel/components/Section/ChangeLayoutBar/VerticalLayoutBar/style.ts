import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const changeVerticalLayoutBarWrapperStyle = (
  direction: "top" | "bottom",
) => css`
  position: absolute;
  ${direction}: -9px;
  display: flex;
  flex-direction: ${direction === "top" ? "column-reverse" : "column"};
  align-items: center;
  width: calc(100% - 8px);
  cursor: pointer;
  z-index: 10;
`

export const changeVerticalLayoutLeftIconStyle = (
  direction: "top" | "bottom",
) => css`
  transform: rotate(${direction === "top" ? "0deg" : "180deg"});
`

export const changeLayoutVerticalBarStyle = css`
  height: 2px;
  width: 100%;
  background-color: ${getColor("techPurple", "01")};
`
