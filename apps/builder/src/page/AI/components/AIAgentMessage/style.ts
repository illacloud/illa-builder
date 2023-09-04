import { css } from "@emotion/react"
import { applyMobileStyle } from "@illa-public/utils"
import { getColor } from "@illa-design/react"

export const agentMessageContainer = css`
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-direction: row;
  width: 100%;
  ${applyMobileStyle(css`
    padding: 24px 12px 8px 12px;
  `)}
`

export const senderContainerStyle = css`
  display: inline-flex;
  align-items: start;
  flex-direction: column;
  overflow-x: hidden;
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
  margin-right: 48px;
  background: ${getColor("grayBlue", "09")};
  padding: 8px 12px;
  margin-top: 4px;
  ${applyMobileStyle(css`
    margin-right: 0;
  `)}
`
