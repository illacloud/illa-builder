import { SerializedStyles, css } from "@emotion/react"
import { MOBILE_MAX_WIDTH } from "@illa-public/utils"
import { getColor } from "@illa-design/react"


export const team_agent_card_height = 196

export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 100%;
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

export const applyMobileStyle = (style: SerializedStyles) => css`
  @media screen and (max-width: ${MOBILE_MAX_WIDTH}px) {
    ${style};
  }
`

export const headerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`

export const titleInfoStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  overflow: hidden;
`

export const agentIconStyle = css`
  width: 48px;
  height: 48px;
  border-radius: 8px;

  ${applyMobileStyle(css`
    width: 40px;
    height: 40px;
  `)}
`

export const nameStyle = css`
  color: #1d2129;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  width: 240px;
  ${textEllipsisStyle};

  ${applyMobileStyle(css`
    font-size: 16px;
  `)}
`

export const descriptionStyle = css`
  color: #787e85;
  height: 40px;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  ${applyMobileStyle(css`
    height: 36px;
    line-height: 18px;
  `)}
`

export const footerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`

export const applyHiddenStyle = (isHidden: boolean) => css`
  visibility: ${isHidden ? "hidden" : "visible"};
`