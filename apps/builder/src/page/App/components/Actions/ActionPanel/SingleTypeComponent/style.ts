import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const actionItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
`

export const checkoutItemStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 30px;
  padding: 0 16px;
`

export const getActionItemStyle = (type: string) => {
  if (["checkbox", "switch"].includes(type)) {
    return css`
      ${checkoutItemStyle};
      width: 100%;
    `
  }
  return css`
    ${actionItemStyle};
    width: 100%;
  `
}

export const actionLabelStyle = css`
  min-width: 160px;
  width: 160px;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: ${getColor("grayBlue", "02")};
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
  color: ${getColor("grayBlue", "02")};
`

export const checkoutContentStyle = css`
  min-height: 22px;
  align-self: flex-start;
  display: flex;
  align-items: center;
`

export const checkboxTipsStyle = css`
  display: inline-block;
  line-height: 22px;
  font-size: 14px;
  text-align: right;
  color: ${getColor("grayBlue", "04")};
`

export const checkboxContentContainerStyle = css`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  align-items: center;
  width: 100%;
`
