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
  border-top: none;
  pointer-events: none;
`

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

export const bottomBarContainerStyle = css`
  height: 100%;
  width: 100%;
  border-bottom: 1px solid ${getColor("techPink", "01")};
  pointer-events: none;
`
