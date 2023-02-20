import { css } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/react"

export const actionItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 8px 16px;
`

export const checkoutItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;
  padding: 0 16px;
`

export const getActionItemStyle = (type: string) => {
  if (type === "checkbox") {
    return css`
      ${checkoutItemStyle};
    `
  }
  return css`
    ${actionItemStyle};
  `
}

export const actionLabelStyle = css`
  min-width: 160px;
  width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
  line-height: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

export const checkboxItemStyle = css`
  min-width: 160px;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
  text-align: left;
  color: ${globalColor(`--${illaPrefix}-grayBlue-02`)};
`

export const checkoutContentStyle = css`
  min-height: 22px;
  align-self: flex-start;
  display: flex;
  align-items: center;
`
