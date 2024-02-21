import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const formGlobalStyle = css`
  color: ${getColor("grayBlue", "02")};
  padding: 12px;
  fieldset {
    margin: 0;
    margin-block-end: 0;
    margin-block-start: 0;
    margin-inline-end: 0;
    margin-inline-start: 0;
    padding-block-end: 0;
    padding-block-start: 0;
    padding-inline-end: 0;
    padding-inline-start: 0;
  }
`
