import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const applyMarkdownPStyle = (textColorScheme: string) => css`
  color: ${getColor(textColorScheme, "01")};
  font-size: 14px;
  white-space: break-spaces;
  word-break: break-all;
`
