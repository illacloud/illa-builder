import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const agentMessageContainer = css`
  padding: 24px 24px 8px 24px;
  display: flex;
  flex-direction: row;
  width: 100%;
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

export const senderMessageStyle = css`
  background: ${getColor("grayBlue", "09")};
  overflow-x: hidden;
  word-break: break-word;
  white-space: pre-wrap;
  padding: 8px 12px;
  margin-top: 4px;
  max-width: 100%;
  border-radius: 8px;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`
