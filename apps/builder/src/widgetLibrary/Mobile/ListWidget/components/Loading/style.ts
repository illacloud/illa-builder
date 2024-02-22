import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const ComponentLoadingStyle = css`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${getColor("white", "03")};
`
