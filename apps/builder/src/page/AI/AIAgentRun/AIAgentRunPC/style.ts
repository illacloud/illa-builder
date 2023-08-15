import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const aiAgentContainerStyle = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export const leftPanelContainerStyle = css`
  height: 100%;
  width: 528px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: 528px;
  box-shadow: 4px 0 16px 0 rgba(0, 0, 0, 0.06);
`

export const rightPanelContainerStyle = css`
  height: 100%;
  display: flex;
  overflow-y: auto;
  min-width: 672px;
  flex-grow: 1;
  flex-direction: column;
`

export const agentTopContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding: 24px;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`

export const agentTitleContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const agentNicknameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-grow: 1;
  flex-shrink: 1;
  margin-left: 16px;
  line-height: 24px;
`

export const agentAvatarStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 8px;
`

export const agentDescStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  white-space: pre-wrap;
  word-break: break-word;
  font-weight: 400;
  margin-top: 24px;
  line-height: 22px;
`

export const agentTeamInfoContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const agentTeamAvatarStyle = css`
  width: 24px;
  height: 24px;
`

export const agentMenuContainerStyle = css`
  display: inline-flex;
  flex-direction: row;
  margin-top: 24px;
`

export const buttonContainerStyle = css`
  padding: 24px;
  border-top: 1px solid ${getColor("grayBlue", "08")};
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const agentTeamNameStyle = css`
  color: ${getColor("grayBlue", "02")};
  margin-left: 8px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

export const agentControlContainerStyle = css`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
`
