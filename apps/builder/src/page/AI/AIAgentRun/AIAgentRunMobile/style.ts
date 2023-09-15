import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const aiAgentContainerStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

export const buttonContainerStyle = css`
  padding: 24px;
  border-top: 1px solid ${getColor("grayBlue", "08")};
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const readOnlyTextStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
`

export const labelLogoStyle = css`
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;

  & svg {
    height: 100%;
    width: 100%;
  }
`

export const labelStyle = css`
  display: flex;
  width: 100%;
  gap: 4px;
  flex-direction: row;
  align-items: center;
`

export const headerInfoStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 12px;
  padding-left: 20px;
  padding-right: 20px;
`

export const headerContainerStyle = css`
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
`

export const previewChatContainer = css`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

export const agentIconStyle = css`
  width: 40px;
  margin-right: 12px;
  height: 40px;
  border-radius: 8px;
`
export const shareContainerStyle = css`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 6px;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
`

export const menuContainerStyle = css`
  display: flex;
  padding-right: 16px;
  padding-top: 12px;
  align-items: center;
  padding-bottom: 12px;
  flex-direction: row;
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
  margin-top: 4px;
`

export const agentTeamNameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-style: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-shrink: 1;
  font-weight: 400;
  line-height: 15px;
`

export const agentNameStyle = css`
  font-size: 14px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
`

export const agentMarketResultStyle = css`
  color: ${getColor("grayBlue", "03")};
  font-size: 12px;
  margin-left: 8px;
  white-space: nowrap;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  overflow: hidden;
  flex-shrink: 0;
  text-overflow: ellipsis;
`

export const agentControlContainerStyle = css`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  padding-bottom: 40px;
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
  margin-top: 12px;
  flex-direction: row;
`

export const dividerStyle = css`
  width: 65px;
  flex-shrink: 1;
`

export const tabContainerStyle = css`
  display: inline-flex;
  padding-top: 5px;
  flex-direction: column;
`

export const tabStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 22px;
  text-transform: capitalize;
`

export const lineStyle = css`
  width: 100%;
  margin-top: 3px;
  height: 2px;
  background: ${getColor("grayBlue", "02")};
`
