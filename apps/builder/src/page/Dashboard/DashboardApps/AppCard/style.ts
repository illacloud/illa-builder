import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { CARD_WIDTH } from "@/page/Dashboard/DashboardApps/style"

export const cardStyle = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  width: ${CARD_WIDTH}px;
  border-radius: 8px;
  //border: 1px solid var(--illa-grayblue-08, #e5e6eb);
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    border-color: ${getColor("techPurple", "01")};
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.08);
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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2px;
`

export const appNameStyle = css`
  color: #1d2129;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  word-wrap: break-word;
`

export const editedStyle = css`
  color: #a9aeb8;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
`

export const descriptionStyle = css`
  color: #787e85;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  word-wrap: break-word;
`

export const footerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`
