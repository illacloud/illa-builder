import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const agentMessageContainer = css`
  padding: 24px 24px 8px 24px;
  display: flex;
  justify-content: end;
  width: 100%;
  flex-direction: row;
`

export const senderContainerStyle = css`
  display: inline-flex;
  overflow-x: hidden;
  flex-direction: column;
  align-items: end;
`

export const senderNicknameStyle = css`
  color: ${getColor("grayBlue", "02")};
  max-width: 100%;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
`

export const senderAvatarStyle = css`
  margin-left: 16px;
`
