import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const codemirrorStyle = css`
  .cm-illa-expression {
    background: #F5FDFA;
    color: ${globalColor(`--${illaPrefix}-green-03`)};
  }
`
