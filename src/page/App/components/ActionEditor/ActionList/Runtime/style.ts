import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export const runtimeTextStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  cursor: pointer;

  &:hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`
export const runtimeDividerStyle = css`
  margin: 8px 0;
`

export const runtimeContainerStyle = css`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weigth: 500;
  padding: 8px;
  width: 200px;
`

export const runtimeItemStyle = css`
  white-space: nowrap;
`

export const runtimeGroupStyle = css`
  margin-top: 16px;
`

export const runtimeGroupChildrenStyle = css`
  padding-left: 8px;
`

export const runtimeValueStyle = css`
  margin-left: 4px;
`
