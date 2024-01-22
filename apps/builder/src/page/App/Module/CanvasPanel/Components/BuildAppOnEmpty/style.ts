import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { CARD_LIST_SEPARATOR_WIDTH } from "./constants"

export const templateCardKeyframes = css`
  @-webkit-keyframes show {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
  @keyframes show {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`

export const containerStyle = (isDraggingInGlobal: boolean) => css`
  width: 100%;
  display: flex;
  background-color: ${getColor("white", "01")};
  padding: 16px 16px 0 16px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: absolute;
  z-index: 99;
  bottom: 0;
  overflow-y: hidden;
  pointer-events: ${isDraggingInGlobal ? "none" : "auto"};
  opacity: ${isDraggingInGlobal ? 0.5 : 1};
`

export const containerHeaderStyle = (width: number) => css`
  color: ${getColor("grayBlue", "02")};
  width: ${width}px;
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
`

export const templateContainerStyle = css`
  width: 100%;
  display: flex;
  height: 156px;
  /* overflow-y: hidden; */
  padding-bottom: 12px;
  box-sizing: content-box;
  align-items: center;
  justify-content: center;
  gap: 24px;
  transform: translateY(100%);
  animation: show 0.3s ease-in-out 0.3s;
  animation-fill-mode: forwards;
  ${templateCardKeyframes};
`

export const lineStyle = css`
  width: ${CARD_LIST_SEPARATOR_WIDTH}px;
  height: 64px;
  background-color: ${getColor("grayBlue", "08")};
`
