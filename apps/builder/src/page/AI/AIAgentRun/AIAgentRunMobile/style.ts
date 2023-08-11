import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const aiAgentContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const headerInfoStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const headerContainerStyle = css`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  padding-left: 40px;
  padding-right: 40px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
`

export const previewChatContainer = css`
  height: 100%;
  width: 100%;
`

export const agentIconStyle = css`
  width: 80px;
  margin-right: 24px;
  height: 80px;
  border-radius: 16px;
`
export const shareContainerStyle = css`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 24px;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
`

export const agentContentContainerStyle = css`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  flex-grow: 1;
  flex-shrink: 1;
`

export const agentMarketContainerStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`

export const agentTeamNameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 24px;
  font-style: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-grow: 1;
  flex-shrink: 1;
  font-weight: 400;
  line-height: 30px;
`

export const agentNameStyle = css`
  font-size: 28px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  font-style: normal;
  font-weight: 500;
  line-height: 34px;
`

export const agentMarketResultStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 24px;
  margin-left: 16px;
  white-space: nowrap;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
`

export const agentControlContainerStyle = css`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
`

export const configContainerStyle = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
`

export const tabsContainerStyle = css`
  display: flex;
  justify-content: center;
  margin-top: 24px;
  flex-direction: row;
`

export const dividerStyle = css`
  width: 130px;
  flex-shrink: 1;
`

export const tabContainerStyle = css`
  display: inline-flex;
  flex-direction: column;
`

export const tabStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 44px;
  text-transform: capitalize;
`

export const lineStyle = css`
  width: 100%;
  height: 4px;
  background: ${getColor("grayBlue", "02")};
`
