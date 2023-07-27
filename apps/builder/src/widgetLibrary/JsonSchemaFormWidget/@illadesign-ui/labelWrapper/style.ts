import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyLabelAndComponentWrapperStyle = (isSingleLine?: boolean) => {
  const singleLineStyle = isSingleLine
    ? `
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-end;
  `
    : ""
  return css`
    color: ${getColor("grayBlue", "02")}!important;
    margin: 8px 0;
    & > label {
      font-size: 14px;
      line-height: 20px;
    }
    ${singleLineStyle};
  `
}
