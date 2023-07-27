import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { agent_card_width } from "@/page/Dashboard/DashboardAiAgent/TeamAgentCard/style"

export const market_agent_card_height = 188
export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: ${agent_card_width}px;
  height: ${market_agent_card_height}px;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: ${getColor("techPurple", "01")};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);

    .dashboardAgentEditButton,
    .dashboardAgentRunButton {
      visibility: visible;
    }
  }
`
export const teamInfoStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
`

export const teamAvatarStyle = css`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`

export const teamNameStyle = css`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: ${getColor("grayBlue", "02")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const actionContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 16px;
`

export const actionCountStyle = css`
  display: flex;
  align-items: center;
  color: ${getColor("grayBlue", "04")};
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
`
