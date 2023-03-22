import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const guidePopoverStyle = css`
  padding: 8px 4px 2px;
`

export const titleStyle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  //width: 264px;
`

export const decsStyle = css`
  margin-top: 8px;
  margin-bottom: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
`

export const actionStyle = css`
  display: flex;
  justify-content: space-between;
`

export const triggerStyle = css`
  & > div > div {
    & > div {
      background-color: ${getColor("techPurple", "01")};
    }
    & > svg {
      color: ${getColor("techPurple", "01")};
    }
  }
`
