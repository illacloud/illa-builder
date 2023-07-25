import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const TEAM_AGENT_ITEM_HEIGHT = 78
export const containerStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
  height: ${TEAM_AGENT_ITEM_HEIGHT}px;
`

export const ellipsisStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`

export const descStyle = css`
  ${ellipsisStyle};
  color: ${getColor("grayBlue", "03")};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  width: 400px;
  height: 36px;
`
