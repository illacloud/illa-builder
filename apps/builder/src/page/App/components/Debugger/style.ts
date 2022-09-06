import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyDebuggerStyle(h: number) {
  return css`
    position: relative;
    width: 100%;
    height: ${h}px;
  `
}

export const titleStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 13px 16px 13px 12px;
  box-shadow: inset 0px -1px 1px #E5E6EB;
  font-weight: 500;
  font-size: 14px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const errorItemStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  height: 38px;
`

export const nameStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  margin-right: 8px;
`

export const sourceStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-03`)};
  text-decoration-line: underline;
  cursor: pointer;

  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`

export const errorIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-red-03`)};
  margin-right: 8px;
`
