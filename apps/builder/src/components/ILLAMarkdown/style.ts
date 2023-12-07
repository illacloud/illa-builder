import { css } from "@emotion/react"
import { getSpecialThemeColor } from "@illa-design/react"

export const applyMarkdownPStyle = (textColorScheme: string) => css`
  color: ${getSpecialThemeColor(textColorScheme)};
  font-size: 14px;
  white-space: break-spaces;
  word-break: break-all;
`
