import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const navBarStyle = css`
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  padding: 6px 16px;
`

export const rowCenter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const viewControlStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  ${rowCenter}
  & > svg {
    &:hover {
      color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
      cursor: pointer;
    }
  }
`

export const informationStyle = css`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  flex-shrink: 1;
`

export const nameStyle = css`
  font-weight: 500;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const descriptionStyle = css`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
`

export function windowIconStyle(selected: boolean): SerializedStyles {
  return css`
    color: ${selected
      ? globalColor(`--${illaPrefix}-grayBlue-03`)
      : globalColor(`--${illaPrefix}-grayBlue-05`)};
  `
}

export const logoCursorStyle = css`
  cursor: pointer;
`

export const windowIconBodyStyle = css`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 2px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${globalColor(`--${illaPrefix}-grayBlue-09`)};
  }
`
