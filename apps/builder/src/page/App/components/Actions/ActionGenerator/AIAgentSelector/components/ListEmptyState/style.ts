import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { AGENT_LIST_HEIGHT } from "../../constants"

export const emptyContainerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: ${AGENT_LIST_HEIGHT}px;
`
export const emptyTipsStyle = css`
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: ${getColor("grayBlue", "04")};
`
