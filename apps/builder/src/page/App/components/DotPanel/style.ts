import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"
import { IllaMode } from "@/redux/config/configState"

export function applyScaleStyle(
  verticalResize: boolean,
  edgeWidth: number,
): SerializedStyles {
  return css`
    /* padding-left: ${edgeWidth}px;
    padding-right: ${edgeWidth}px;
    padding-top: ${edgeWidth}px; */
    overflow-x: hidden;
    overflow-y: ${verticalResize ? "auto" : "hidden"};
    width: 100%;
    height: 100%;
  `
}

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
    left: ${left};
    width: ${width};
    height: ${height};
    display: flex;
    flex-direction: column;
    min-height: 96px;
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
    left: ${left};
    width: ${width};
    height: ${height};
    display: flex;
    flex-direction: column-reverse;
    min-height: 96px;
  `
}

export const applyLeftSectionWrapperStyle = (
  width: string,
  top: string = "0px",
) => {
  return css`
    position: absolute;
    top: ${top};
    left: 0;
    height: 100%;
    width: ${width};
    display: flex;
    flex-direction: row;
    min-width: 240px;
  `
}

export const applyRightSectionWrapperStyle = (
  width: string,
  top: string = "0px",
) => {
  return css`
    position: absolute;
    top: ${top};
    right: 0;
    height: 100%;
    width: ${width};
    display: flex;
    flex-direction: row-reverse;
    min-width: 240px;
  `
}

export const applyContainerWrapperStyle = (model: IllaMode) => {
  return css`
    width: 100%;
    height: 100%;
    padding: ${model !== "edit" ? "0" : "8px"};
    overflow-y: auto;
  `
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
  `
}

export const sideBarIconStyle = css`
  cursor: pointer;
  flex: none;
`
