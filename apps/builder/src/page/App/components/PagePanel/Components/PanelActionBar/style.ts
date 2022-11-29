import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const panelActionBarWrapperStyle = css`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex: none;
`

export const baseIconStyle = css`
  font-size: 12px;
`

export const clickHotpotWrapperStyle = css`
  padding: 6px;
  flex: none;
  cursor: pointer;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};

  :hover {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
  :active {
    color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  }
`
