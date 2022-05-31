import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyTypeIcon(type: string): SerializedStyles {
  let typeStyle
  switch (type) {
    case "string":
      typeStyle = css``
  }
  return css`
    width: 14px;
    height: 14px;
    border-radius: 2px;
    ${typeStyle};
  `
}

export const itemCss = css`
  display: flex;
  align-items: center;
  height: 22px;
  margin-top: 2px;
`

export const contentCss = css`
  display: inline-block;
  margin: 0 8px;
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  flex: 1;
`

export const typeCss = css`
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-05`)};
`
