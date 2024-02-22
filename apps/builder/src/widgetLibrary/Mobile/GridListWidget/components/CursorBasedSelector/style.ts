import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const selectContainerStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`

export const operationIconStyle = (disabled: boolean) => {
  return css`
    pointer-events: ${disabled ? "not-allowed" : "auto"};
    font-size: 14px;
    width: 32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    border-radius: 4px;
    cursor: ${disabled ? "not-allowed" : "pointer"};
    color: ${getColor("grayBlue", disabled ? "08" : "03")};
    background-color: unset;
  `
}
