import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export function applyDebuggerStyle(h: number) {
  return css`
    position: relative;
    width: 100%;
    height: ${h}px;
    display: flex;
    flex-direction: column;
  `
}

export const containerStyle = css`
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const titleStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 13px 16px 13px 12px;
  box-shadow: inset 0px -1px 1px #e5e6eb;
  font-weight: 500;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const errorContentStyle = css`
  min-width: 700px;
  width: 100%;
`
