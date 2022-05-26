import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

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
  align-items: center;
`

export const viewControlStyle = css`
  gap: 12px;
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
`
