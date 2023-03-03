import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"
import {
  FOOTER_MIN_HEIGHT,
  HEADER_MIN_HEIGHT,
  LEFT_MIN_WIDTH,
  RIGHT_MIN_WIDTH,
} from "@/page/App/components/DotPanel/renderSection"
import { IllaMode } from "@/redux/config/configState"

export const applyComponentCanvasStyle = (
  width: number,
  height: number,
  unitWidth: number,
  unitHeight: number = 8,
  showDot: boolean = false,
  addHeight: number = 0,
  minHeight?: number,
) => {
  const heightCss = minHeight
    ? css`
        height: ${addHeight}px;
        min-height: ${minHeight}px;
      `
    : css`
        min-height: 100vh;
        height: ${addHeight}px;
      `
  return css`
    width: 100%;
    ${heightCss};
    ${showDot
      ? applyDotBackgroundStyle(width, height, unitWidth, unitHeight)
      : normalCanvasBackgroundStyle}
    position: relative;
  `
}

const normalCanvasBackgroundStyle = css`
  background: unset;
`

export const applyDotBackgroundStyle = (
  width: number,
  height: number,
  unitWidth: number,
  unitHeight: number = 8,
) => {
  return css`
    background-image: radial-gradient(
        circle at 1px 1px,
        ${globalColor(`--${illaPrefix}-grayBlue-08`)} 1px,
        transparent 0px
      ),
      radial-gradient(
        circle at ${width - 1}px 1px,
        ${globalColor(`--${illaPrefix}-grayBlue-08`)} 1px,
        transparent 0px
      );
    background-repeat: repeat;
    background-size: ${unitWidth}px ${unitHeight}px, 100% ${unitHeight}px;
  `
}

export const applyDotLintRectangleStyle = (
  w: number,
  h: number,
  x: number = 0,
  y: number = 0,
) => {
  return css`
    width: ${w}px;
    height: ${h}px;
    border: 1px dashed ${globalColor(`--${illaPrefix}-techPurple-01`)};
    position: absolute;
    transform: translate(${x}px, ${y}px);
    z-index: 6;
    pointer-events: none;
  `
}

export const applyRectangleStyle = (
  w: number,
  h: number,
  x: number,
  y: number,
  canDrop: boolean = false,
) => {
  return css`
    width: ${w}px;
    height: ${h}px;
    background-color: ${canDrop
      ? globalColor(`--${illaPrefix}-techPurple-01`)
      : "red"};
    opacity: 0.16;
    position: absolute;
    transform: translate(${x}px, ${y}px);
    z-index: 6;
    pointer-events: none;
  `
}

export const borderLineStyle = css`
  width: 100%;
  height: 100%;
  border: 2px solid #f7f8fa;
`

export const applyFreezePlaceholderShapeStyle = (
  top: number,
  left: number,
  height: number,
  width: number,
) => {
  return css`
    position: absolute;
    left: ${left}px;
    top: ${top}px;
    width: ${width}px;
    height: ${height}px;
    border: 1px dashed ${globalColor(`--${illaPrefix}-techPurple-01`)};
    z-index: 6;
  `
}

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
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
  :active {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`

export const resizeVerticalBarStyle = css`
  height: 2px;
  width: 32px;
  border-radius: 1px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
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
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
  :active {
    background-color: ${globalColor(`--${illaPrefix}-grayBlue-08`)};
  }
`

export const resizeHorizontalBarStyle = css`
  width: 2px;
  height: 32px;
  border-radius: 1px;
  background-color: ${globalColor(`--${illaPrefix}-grayBlue-06`)};
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

export const applyContainerWrapperStyle = (model: IllaMode) => {
  return css`
    width: 100%;
    height: 100%;
    padding: ${model !== "edit" ? "0" : "8px"};
    overflow-y: auto;
    overflow-x: hidden;
  `
}

export const applyModalWrapperStyle = (model: IllaMode) => {
  return css`
    padding: ${model !== "edit" ? "0" : "8px"};
    padding-top: ${model !== "edit" ? "0" : "20px"};
    overflow-y: auto;
    overflow-x: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  `
}

export const applyNoBottomPaddingStyle = (isShowFold: boolean) => {
  return isShowFold
    ? css`
        padding-bottom: 0;
      `
    : null
}

export const changeLayoutTopBarWrapperStyle = css`
  position: absolute;
  top: -9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 8px);
  cursor: pointer;
  z-index: 10;
`

export const changeLayoutBottomBarWrapperStyle = css`
  position: absolute;
  bottom: -9px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  width: calc(100% - 8px);
  cursor: pointer;
  z-index: 10;
`

export const changeLayoutLeftBarWrapperStyle = css`
  position: absolute;
  left: -9px;
  display: flex;
  align-items: center;
  height: calc(100% - 8px);
  cursor: pointer;
  z-index: 10;
`

export const changeLayoutRightBarWrapperStyle = css`
  position: absolute;
  right: -9px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: calc(100% - 8px);
  cursor: pointer;
  z-index: 10;
`

export const changeLayoutHorizontalBarStyle = css`
  width: 100%;
  height: 2px;
  background-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
`

export const changeLayoutBottomIconStyle = css`
  transform: rotate(180deg);
`

export const changeLayoutLeftIconStyle = css`
  transform: rotate(-90deg);
`

export const changeLayoutRightIconStyle = css`
  transform: rotate(90deg);
`

export const changeLayoutVerticalBarStyle = css`
  width: 2px;
  height: 100%;
  background-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
`

export const applySideBarWrapperStyle = (direction: "left" | "right") => {
  return css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${direction === "left" ? "flex-end" : "flex-start"};
    padding: 8px 0px;
    color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
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
  background-color: ${globalColor(`--${illaPrefix}-white-01`)};
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.08);
  border-radius: 0px 16px 16px 0px;
  cursor: pointer;
  font-size: 12px;
  color: ${globalColor(`--${illaPrefix}-grayBlue-04`)};
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
  background-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
  border: 1px solid ${globalColor(`--${illaPrefix}-white-01`)};
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

export const pageContainerWrapperStyle = css`
  width: 100%;
  height: 100%;
`

export const applyCanvasContainerWrapperStyle = (
  width: string,
  mode: IllaMode,
) => {
  const borderStyle =
    mode === "edit" && width !== "100%"
      ? css`
          border-left: 1px solid ${getColor("grayBlue", "09")};
          border-right: 1px solid ${getColor("grayBlue", "09")};
        `
      : null
  return css`
    width: ${width};
    height: 100%;
    position: relative;
    background-color: ${getColor("white", "01")};
    flex: none;
    margin: 0 auto;
    ${borderStyle};
  `
}

export const applyViewportContainerWrapperStyle = (
  mode: IllaMode,
  width?: number,
  height?: number,
) => {
  const borderStyle =
    mode === "edit" && width != undefined
      ? css`
          border: 1px solid ${getColor("grayBlue", "09")};
        `
      : null
  return css`
    width: ${mode === "production"
      ? "100%"
      : width != undefined
      ? `${width}px`
      : "100%"};
    height: ${mode === "production"
      ? "100%"
      : height != undefined
      ? `${height}px`
      : "100%"};
    background-color: ${getColor("white", "01")};
    overflow: auto;
    margin: 0 auto;
    ${borderStyle}
  `
}

export const previewColumnsWrapperStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
`

export const applyPreviewColumnsStyle = (index: number, unitWidth: number) => {
  return css`
    width: ${unitWidth}px;
    height: 100%;
    background-color: ${index % 2 === 0
      ? "rgba(101, 74, 236, 0.08)"
      : "transparent"};
  `
}

export const modalWrapperStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
`

export const maskStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${getColor("blackAlpha", "02")};
  z-index: -1;
`

export const modalStyle = css`
  width: 90%;
  height: 90%;
  background-color: red;
`

export const bodySectionWrapperStyle = css`
  position: absolute;
  width: var(--illa-canvas-body-width, 100%);
  left: var(--illa-canvas-body-left, 0);
  top: var(--illa-canvas-body-top, 0);
  height: var(--illa-canvas-body-height);
`

// leftRef.current.style.height = `${leftHeight}px`
// leftRef.current.style.top = `${leftTop}px`

export const leftSectionWrapperStyle = css``
