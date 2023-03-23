import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const movableModalWrapperStyle = css`
  width: 100%;
  height: 100%;
  background-color: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`
