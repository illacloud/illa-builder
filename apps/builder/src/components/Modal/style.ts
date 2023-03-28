import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyModalWrapperStyle = (w?: number, h?: number) => css`
  width: ${w != undefined ? `${w}px` : "100%"};
  height: ${w != undefined ? `${h}px` : "100%"};
  background-color: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`
