import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const modalMaskStyle = css`
  background-color: ${getColor("white", "05")};
  backdrop-filter: blur(5px);
`

export const modalStyle = css`
  border: unset;
  width: 486px;
  min-width: 486px;
  background: ${getColor("white", "01")};
  border: 1px solid ${getColor("grayBlue", "08")};
  box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
  border-radius: 8px;
  overflow: hidden;

  ${applyMobileStyle(css`
    width: 358px;
    min-width: 358px;
    border-radius: 8px;
  `)}
`

export const modalCloseIconStyle = css`
  position: absolute;
  width: 24px;
  height: 24px;
  line-height: 10px;
  text-align: center;
  top: 18px;
  right: 17px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${getColor("grayBlue", "02")};
`

export const decorateStyle = css`
  width: 100%;

  ${applyMobileStyle(css`
    height: 202px;
  `)};
`

export const headerStyle = css`
  padding: 16px;
`

export const titleStyle = css`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 8px;

  ${applyMobileStyle(css`
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 8px;
  `)};
`

export const descriptionStyle = css`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${getColor("grayBlue", "03")};

  ${applyMobileStyle(css`
    font-size: 14px;
    line-height: 17px;
  `)};
`

export const boldStyle = css`
  color: ${getColor("grayBlue", "02")};
`

export const footerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`

export const upgradeButtonStyle = css`
  align-self: center;
`

export const priceContentStyle = css`
  font-size: 12px;
  line-height: 20px;
  color: ${getColor("grayBlue", "03")};

  ${applyMobileStyle(css`
    font-size: 12px;
    line-height: 20px;
  `)};
`

export const priceStyle = css`
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: ${getColor("grayBlue", "02")};
`

export const applyCardListStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  text-align: start;
  padding: 4px 24px;

  ${applyMobileStyle(css`
    gap: 8px;
    font-size: 14px;
    line-height: 24px;
  `)};
`

export const doubtStyle = css`
  cursor: pointer;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;

  &:hover .tips {
    display: block;
  }

  ${applyMobileStyle(css`
    width: 16px;
    height: 16px;
  `)};
`

export const iconStyle = css`
  height: 16px;
  width: 16px;
  flex-shrink: 0;

  ${applyMobileStyle(css`
    width: 16px;
    height: 16px;
  `)};
`

export const linkStyle = css`
  display: flex;
  padding: 0;
`
