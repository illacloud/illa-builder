import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { DATABASE_CARD_WIDTH } from "../constants"
import { templateCardKeyframes } from "../style"

export const paddingStyle = css`
  padding-bottom: 4px;
`

export const containerStyle = css`
  width: ${DATABASE_CARD_WIDTH}px;
  flex: none;
  height: 156px;
  display: flex;
  padding: 16px;
  transform: translateY(100%);
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "09")};
  background: ${getColor("white", "01")};
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.09);
  animation: show 0.3s ease-in-out 0.3s;
  animation-fill-mode: forwards;
  ${templateCardKeyframes};
`

export const textContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  color: ${getColor("grayBlue", "02")};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
`
