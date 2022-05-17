import { css } from "@emotion/react"
import { illaPrefix, globalColor } from "@illa-design/theme"

export const labelCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
`

export const listWrapperCss = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  border-radius: 8px;
  box-sizing: border-box;
  padding: 12px 0;
`
