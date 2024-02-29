import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const generationContainerStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 72px;
  padding-left: 24px;
  padding-bottom: 24px;
  padding-right: 24px;
  border-radius: 8px;
  border: 1px solid #f2f3f5;
  background: ${getColor("white", "01")};
  max-width: 100%;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
  ${applyMobileStyle(css`
    margin: 48px 20px 20px;
    padding-left: 12px;
    padding-right: 12px;
  `)}
`

export const avatarContainerStyle = css`
  width: 100%;
  left: 0;
  position: absolute;
  top: -24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const avatarStyle = css`
  border-radius: 8px;
  width: 48px;
  height: 48px;
`

export const nickNameStyle = css`
  color: getColor("grayBlue", "100");
  margin-bottom: 48px;
  overflow-x: hidden;
  align-self: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 32px;
  max-width: 100%;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
`

export const copyContainerStyle = css`
  cursor: pointer;
  width: 32px;
  height: 32px;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  align-self: end;
  &:hover {
    background: ${getColor("grayBlue", "09")};
  }
`
