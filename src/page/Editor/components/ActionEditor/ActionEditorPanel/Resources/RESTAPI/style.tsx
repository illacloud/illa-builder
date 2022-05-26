import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const actionTypeCss = css`
  display: grid;
  align-items: center;
  grid-template-columns: 160px 1fr;
  gap: 16px;
`

export const descriptionCss = css`
  margin: 0;
  align-items: center;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
`

export const descriptionCodeCss = css`
  font-size: 12px;
`

export const bodyFieldCss = css`
  flex-direction: column;
  gap: 16px;
  display: flex;
`
