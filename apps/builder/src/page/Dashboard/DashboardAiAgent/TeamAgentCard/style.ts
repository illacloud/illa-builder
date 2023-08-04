import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { agent_card_width } from "@/illa-public-market-component/MarketAgentCard/style"

export const team_agent_card_height = 196

export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: ${agent_card_width}px;
  height: ${team_agent_card_height}px;
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
export const textEllipsisStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const appActionButtonStyle = css`
  visibility: hidden;
  transition: all 0.2s ease-in-out;
`
