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
  background-color: ${getColor("techPurple", "03")};
  padding: 8px 4px;
  max-width: 264px;
`

export const titleStyle = css`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`

export const decsStyle = css`
  margin-top: 8px;
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  word-break: break-all;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const linkStyle = css`
  color: ${getColor("white", "01")};
  text-decoration: underline;
`

export const actionStyle = css`
  display: flex;
  justify-content: space-between;
`

export const triggerStyle = css`
  & > div > div {
    & > div {
      background-color: ${getColor("techPurple", "03")};
      border-radius: 2px;
    }

    & > svg {
      color: ${getColor("techPurple", "03")};
    }
  }
`

export const applyHiddenStyle = (hide?: boolean) => {
  return css`
    visibility: ${hide ? "hidden" : "visible"};
  `
}

export const buttonStyle = css`
  padding: 0 2px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("white", "01")};
`
