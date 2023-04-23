import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const advancedPanelHeaderContainerStyle = css`
  width: 100%;
  padding: 16px 16px 0;
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${getColor("grayBlue", "04")};
  text-transform: uppercase;
`
