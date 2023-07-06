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
  border: 1px solid ${getColor("grayBlue", "08")};
  background: ${getColor("white", "01")};
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
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
  overflow: hidden;
`

export const appNameStyle = css`
  color: #1d2129;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
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

export const editorContainerStyle = css`
  display: flex;
  align-items: flex-start;
`
export const editorAvatarStyle = css`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${getColor("white", "01")};
  margin-right: -6px;
`

export const footerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
`
