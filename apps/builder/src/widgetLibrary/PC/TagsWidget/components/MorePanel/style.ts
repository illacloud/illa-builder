import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const panelContainerStyle = css`
  max-width: 240px;
  padding: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid ${getColor("gray", "08")};
  background: ${getColor("white", "01")};
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.16);
`
