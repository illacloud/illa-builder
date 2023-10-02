import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

export const containerWrapperStyle = css`
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`
export const applyNoBottomPaddingStyle = (isShowFold: boolean) => {
  return isShowFold
    ? css`
        padding-bottom: 0;
      `
    : null
}

export const openFoldWrapperStyle = css`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${getColor("white", "01")};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  border-radius: 0px 16px 16px 0px;
  cursor: pointer;
  font-size: 12px;
  color: ${getColor("grayBlue", "02")};
`

export const applyOpenFoldPositionStyle = (direction: "left" | "right") => {
  return css`
    position: absolute;
    bottom: 8px;
    transform: ${direction === "right" ? "rotate(180deg)" : "unset"};
  `
}

export const applyCloseFoldPositionStyle = css`
  position: absolute;
  right: 0;
  bottom: 8px;
  border-radius: 16px 0 0 16px;
`

export const rotaIconStyle = css`
  transform: rotate(180deg);
`

export const applyHorizontalAnimationWrapperStyle = (
  isFold: boolean,
  direction: "left" | "right",
) => css`
  width: 100%;
  height: 100%;
  visibility: ${!isFold ? "visible" : "hidden"};
  display: flex;
  flex-direction: ${direction === "right" ? "row-reverse" : "row"};
`
