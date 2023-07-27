import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { RESIZE_BAR_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"

export const disabledHorizontalBarWrapperStyle = css`
  height: 100%;
  width: 8px;
  background-color: #f7f8fa;
`

export const resizeBarBasicWrapperStyle = css`
  background-color: #f7f8fa;
  transition: background-color 200ms ease-in-out;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
`

export const resizeVerticalBarWrapperStyle = css`
  ${resizeBarBasicWrapperStyle};
  width: 100%;
  height: ${RESIZE_BAR_HEIGHT}px;
`

export const resizeHorizontalBarWrapperStyle = css`
  ${resizeBarBasicWrapperStyle}
  height: 100%;
  width: ${RESIZE_BAR_HEIGHT}px;
  cursor: col-resize;
  :hover {
    background-color: ${getColor("grayBlue", "08")};
  }
  :active {
    background-color: ${getColor("grayBlue", "08")};
  }
`

export const resizeHorizontalBarStyle = css`
  width: 2px;
  height: 32px;
  border-radius: 1px;
  background-color: ${getColor("grayBlue", "06")};
`

export const containerWrapperStyle = css`
  width: 100%;
  height: 100%;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`

export const applyNoBottomPaddingStyle = (isShowFold: boolean) => {
  return isShowFold
    ? css`
        padding-bottom: 0;
      `
    : null
}

export const applySideBarWrapperStyle = (direction: "left" | "right") => {
  return css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${direction === "left" ? "flex-end" : "flex-start"};
    padding: 0 8px 8px 8px;
    color: ${getColor("grayBlue", "04")};
    font-size: 12px;
  `
}

export const sideBarIconStyle = css`
  cursor: pointer;
  flex: none;
`

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
  color: ${getColor("grayBlue", "04")};
`

export const applyOpenFoldPositionStyle = (direction: "left" | "right") => {
  return css`
    position: absolute;
    bottom: 8px;
    transform: ${direction === "right" ? "rotate(180deg)" : "unset"};
  `
}

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
export const basicTipsStyle = css`
  position: absolute;
  padding: 2px 4px;
  background-color: ${getColor("techPurple", "01")};
  border: 1px solid ${getColor("white", "01")};
  border-radius: 4px;
  color: white;
  user-select: none;
  pointer-events: none;
  font-size: 12px;
  overflow: hidden;
  z-index: 10;
`

export const horizontalWidthTipsStyle = (direction: "left" | "right") => {
  return css`
    ${basicTipsStyle};
    ${direction}: -35px;
    top: calc(50% - 10px);
  `
}
