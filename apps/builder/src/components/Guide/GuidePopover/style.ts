import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const topStyle = css`
  position: absolute;
  top: 0;
  transform: translateY(calc(-100% - 20px));
  z-index: 2;
  color: ${getColor("white", "01")};
  padding: 16px;
  border-radius: 2px;
`
export const bottomStyle = css`
  position: absolute;
  top: calc(100% + 10px);
  z-index: 2;
  color: ${getColor("white", "01")};
  padding: 16px;
  border-radius: 2px;
`

export const guidePopoverStyle = css`
  background-color: ${getColor("techPurple", "01")};
  padding: 8px 4px 2px;
  max-width: 264px;
`

export const titleStyle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
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
      border-radius: 2px;
    }

    & > svg {
      color: ${getColor("techPurple", "01")};
    }
  }
`
