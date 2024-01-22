import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { MORE_CARD_WIDTH } from "../constants"
import { templateCardKeyframes } from "../style"

export const containerStyle = css`
  display: flex;
  align-items: flex-start;
  height: 100%;
  box-sizing: content-box;
  padding-bottom: 4px;
  overflow-y: hidden;
  overflow-x: auto;
  gap: 16px;
`

export const templateCardContainerStyle = (
  index: number,
  showAnimation: boolean,
) => {
  const animation = showAnimation
    ? css`
        transform: translateY(100%);
        animation: show 0.3s ease-in-out ${0.3 + 0.02 * (index + 1)}s;
        animation-fill-mode: forwards;
        ${templateCardKeyframes};
      `
    : css``
  return css`
    min-height: 156px;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.09);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${getColor("grayBlue", "09")};
    ${animation};
  `
}

export const templateCardStyle = css`
  border: none;
`

export const moreContainerStyle = (index: number) => css`
  display: flex;
  cursor: pointer;
  width: ${MORE_CARD_WIDTH}px;
  flex: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${getColor("grayBlue", "09")};
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.09);
  transform: translateY(100%);
  animation: show 0.3s ease-in-out ${0.3 + 0.02 * (index + 1)}s;
  animation-fill-mode: forwards;
  ${templateCardKeyframes};
`

export const moreContentStyle = css`
  display: flex;
  padding: 0px 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${getColor("techPurple", "03")};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  text-transform: capitalize;
`
