import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const layoutWrapperStyle = css`
  background: #fafafa;
  width: 100%;
  height: 100%;
  display: flex;
`

export const leftAsideWrapperStyle = css`
  padding: 56px 0 37px;
  width: 240px;
  position: relative;
  flex: none;
  display: flex;
  flex-direction: column;
  overflow: auto;
`

export const rightAsideWrapperStyle = css`
  position: relative;
  background: ${globalColor(`--${illaPrefix}-white-01`)};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  padding: 0 32px;
  width: 100%;
  height: 100%;
`
