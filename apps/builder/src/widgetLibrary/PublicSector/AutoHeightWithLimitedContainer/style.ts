import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import {
  applyBarHandlerStyle,
  applyBarPointerShapeStyle,
} from "@/page/App/components/ScaleSquare/style"

export const containerStyle = css`
  height: 100%;
  width: 100%;
  border: 1px dashed ${getColor("techPink", "01")};
  padding: 2px;
  border-top: none;
  pointer-events: none;
`

export const containerBorderStyle = (
  position: "t" | "b" | "l" | "r",
  zIndex: number = -1,
) => {
  switch (position) {
    case "t":
      return css`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(
          to right,
          ${getColor("techPink", "01")},
          ${getColor("techPink", "01")} 5px,
          transparent 5px,
          transparent
        );
        background-size: 10px 100%;
        z-index: ${zIndex};
      `
    case "b":
      return css`
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(
          to right,
          ${getColor("techPink", "01")},
          ${getColor("techPink", "01")} 5px,
          transparent 5px,
          transparent
        );
        background-size: 10px 100%;
      `
    case "l":
      return css`
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(
          to bottom,
          ${getColor("techPink", "01")},
          ${getColor("techPink", "01")} 5px,
          transparent 5px,
          transparent
        );
        background-size: 100% 10px;
        z-index: ${zIndex};
      `
    case "r":
      return css`
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        background: linear-gradient(
          to bottom,
          ${getColor("techPink", "01")},
          ${getColor("techPink", "01")} 5px,
          transparent 5px,
          transparent
        );
        background-size: 100% 10px;
        z-index: ${zIndex};
      `
  }
}

export const applyResizeBarPointStyle = css`
  ${applyBarPointerShapeStyle("b")}
  background-color: white;
  border: 1px solid ${getColor("techPink", "01")};
  :hover {
    background-color: ${getColor("techPink", "01")};
  }
  :active {
    background-color: ${getColor("techPink", "01")};
  }
`
