import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const modelContainerStyle = css`
  display: flex;
  margin-top: 4px;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`

export const modelNameStyle = css`
  color: ${getColor("grayBlue", "02")};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`

export const modelLogoStyle = css`
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

export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: 100%;
  height: 212px;
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

export const headerStyle = css`
  display: flex;
  flex-direction: row;
`

export const titleInfoStyle = css`
  display: flex;
  margin-right: 8px;
  justify-content: center;
  flex-grow: 1;
  flex-direction: column;
  margin-left: 16px;
  overflow: hidden;
`

export const agentIconStyle = css`
  width: 64px;
  height: 64px;
  border-radius: 8px;
`

export const nameStyle = css`
  color: #1d2129;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  ${textEllipsisStyle};
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
