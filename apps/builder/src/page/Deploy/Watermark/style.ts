import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const deployLogoStyle = css`
  position: absolute;
  bottom: 16px;
  right: 16px;
  box-shadow: 0 0 8px 0 ${getColor("blackAlpha", "07")};
  border: solid 1px ${getColor("grayBlue", "09")};
  border-radius: 8px;
  font-size: 12px;
  padding: 0 12px;
  height: 40px;
  display: flex;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  background-color: ${getColor("white", "01")};
`
export const logoStyle = css`
  width: 25px;
  height: 12px;
  margin-left: 8px;
`
