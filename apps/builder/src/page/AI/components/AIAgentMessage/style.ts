import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const agentMessageContainer = css`
  padding: 24px 88px 8px 40px;
  display: flex;
  flex-direction: row;
  width: 100%;
  ${applyMobileStyle(css`
    padding: 24px 48px 8px 12px;
  `)}
`

export const senderContainerStyle = css`
  display: inline-flex;
  align-items: start;
  flex-direction: column;
  max-width: 100%;
  position: relative;
`

export const senderAvatarStyle = css`
  margin-right: 16px;
`

export const senderNicknameStyle = css`
  color: ${getColor("grayBlue", "02")};
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  max-width: 100%;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const messageContainerStyle = css`
  border-radius: 8px;
  background: ${getColor("grayBlue", "09")};
  padding: 12px;
  margin-top: 4px;
  max-width: 100%;
  ${applyMobileStyle(css`
    margin-right: 0;
  `)}
`

export const hoverCopyStyle = css`
  display: inline-flex;
  padding: 4px;
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  cursor: pointer;
  color: ${getColor("grayBlue", "02")};
  position: absolute;
  bottom: 0;
  right: -32px;
`
