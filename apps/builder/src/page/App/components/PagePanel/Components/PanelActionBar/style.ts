import { illaPrefix, globalColor } from "@illa-design/theme"
import { css } from "@emotion/react"

export const panelActionBarWrapperStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: none;
`

export const baseIconStyle = css`
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
  cursor: pointer;
  :hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
  :active {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`
