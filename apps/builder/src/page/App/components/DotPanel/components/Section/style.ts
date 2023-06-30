import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import {
  FOOTER_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/constant/canvas"

export const changeHorizontalLayoutBarWrapperStyle = (
  direction: "left" | "right",
) => {
  return css`
    position: absolute;
    ${direction}: -9px;
    flex-direction: ${direction === "left" ? "row-reverse" : "row"};
    display: flex;
    align-items: center;
    height: calc(100% - 8px);
    cursor: pointer;
    z-index: 10;
  `
}

export const changeVerticalLayoutBarWrapperStyle = (
  direction: "top" | "bottom",
) => {
  return css`
    position: absolute;
    ${direction}: -9px;
    display: flex;
    flex-direction: ${direction === "top" ? "column-reverse" : "column"};
    align-items: center;
    width: calc(100% - 8px);
    cursor: pointer;
    z-index: 10;
  `
}

export const changeLayoutHorizontalBarStyle = css`
  width: 2px;
  height: 100%;
  background-color: ${getColor("techPurple", "01")};
`

export const changeHorizontalLayoutLeftIconStyle = (
  direction: "left" | "right",
) => css`
  transform: rotate(${direction === "left" ? "-90deg" : "90deg"});
`

export const changeVerticalLayoutLeftIconStyle = (
  direction: "top" | "bottom",
) => css`
  transform: rotate(${direction === "top" ? "0deg" : "180deg"});
`

export const changeLayoutVerticalBarStyle = css`
  height: 2px;
  width: 100%;
  background-color: ${getColor("techPurple", "01")};
`

export const resizeVerticalBarWrapperStyle = css`
  width: 100%;
  height: 8px;
  background-color: #f7f8fa;
  transition: background-color 200ms ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: none;
  cursor: row-resize;
  :hover {
    background-color: ${getColor("grayBlue", "08")};
  }
  :active {
    background-color: ${getColor("grayBlue", "08")};
  }
`

export const resizeVerticalBarStyle = css`
  height: 2px;
  width: 32px;
  border-radius: 1px;
  background-color: ${getColor("grayBlue", "06")};
`

export const disabledHorizontalBarWrapperStyle = css`
  height: 100%;
  width: 8px;
  background-color: #f7f8fa;
`

export const resizeHorizontalBarWrapperStyle = css`
  height: 100%;
  width: 8px;
  background-color: #f7f8fa;
  transition: background-color 200ms ease-in-out;
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
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

export const applyHeaderSectionWrapperStyle = (
  height: string,
  left: string = "0px",
  width: string = "0px",
) => {
  return css`
    position: absolute;
    top: 0;
    left: var(--illa-canvas-header-left, ${left});
    width: var(--illa-canvas-header-width, ${width});
    height: ${height};
    display: flex;
    flex-direction: column;
    min-height: ${HEADER_MIN_HEIGHT}px;
  `
}

export const applyFooterSectionWrapperStyle = (
  height: string,
  left: string = "0px",
  width: string = "0px",
) => {
  return css`
    position: absolute;
    bottom: 0;
    left: var(--illa-canvas-footer-left, ${left});
    width: var(--illa-canvas-footer-width, ${width});
    height: ${height};
    display: flex;
    flex-direction: column-reverse;
    min-height: ${FOOTER_MIN_HEIGHT}px;
  `
}

export const applyLeftSectionWrapperStyle = (
  width: string,
  top: string = "0px",
  isFold: boolean,
) => {
  return css`
    position: absolute;
    top: var(--illa-canvas-left-top, ${top});
    left: 0;
    height: var(--illa-canvas-left-height, 100%);
    width: ${width};
    display: flex;
    flex-direction: row;
    min-width: ${isFold ? 0 : `${LEFT_MIN_WIDTH}px`};
  `
}

export const applyRightSectionWrapperStyle = (
  width: string,
  top: string = "0px",
  isFold: boolean,
) => {
  return css`
    position: absolute;
    top: var(--illa-canvas-right-top, ${top});
    right: 0;
    height: var(--illa-canvas-right-height, 100%);
    width: ${width};
    display: flex;
    flex-direction: row-reverse;
    min-width: ${isFold ? 0 : `${RIGHT_MIN_WIDTH}px`};
  `
}

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

export const leftOpenFoldPositionStyle = css`
  position: absolute;
  bottom: 8px;
`

export const rightOpenFoldPositionStyle = css`
  transform: rotate(180deg);
  position: absolute;
  bottom: 8px;
`

export const applyLeftAnimationWrapperStyle = (isFold: boolean) => {
  return css`
    width: 100%;
    height: 100%;
    visibility: ${!isFold ? "visible" : "hidden"};
    display: flex;
    flex-direction: row;
    position: relative;
  `
}

export const applyRightAnimationWrapperStyle = (isFold: boolean) => {
  return css`
    width: 100%;
    height: 100%;
    visibility: ${!isFold ? "visible" : "hidden"};
    display: flex;
    flex-direction: row-reverse;
  `
}

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

export const leftWidthTipsStyle = css`
  ${basicTipsStyle};
  right: -35px;
  top: calc(50% - 10px);
`
export const rightWidthTipsStyle = css`
  ${basicTipsStyle};
  left: -35px;
  top: calc(50% - 10px);
`

export const headerHeightTipsStyle = css`
  ${basicTipsStyle};
  bottom: -20px;
  left: calc(50% - 18px);
`

export const footerHeightTipsStyle = css`
  ${basicTipsStyle};
  top: -20px;
  left: calc(50% - 18px);
`

export const modalWrapperStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 8;
`

export const bodySectionWrapperStyle = css`
  position: absolute;
  width: var(--illa-canvas-body-width, 100%);
  left: var(--illa-canvas-body-left, 0);
  top: var(--illa-canvas-body-top, 0);
  height: var(--illa-canvas-body-height);
`
