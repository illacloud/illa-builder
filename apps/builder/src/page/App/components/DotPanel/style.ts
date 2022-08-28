import { css, SerializedStyles } from "@emotion/react"
import { globalColor, illaPrefix } from "@illa-design/theme"

export function applyScaleStyle(
  verticalResize: boolean,
  edgeWidth: number,
): SerializedStyles {
  return css`
    position: relative;
    padding-left: ${edgeWidth}px;
    padding-right: ${edgeWidth}px;
    padding-top: ${edgeWidth}px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: ${verticalResize ? "auto" : "hidden"};
    width: 100%;
    height: 100%;
  `
}

export function applyChildrenContainerStyle(
  z: number,
  w: number | null,
  h?: number | null,
): SerializedStyles {
  return css`
    z-index: ${z};
    position: absolute;
    width: ${w}px;
    height: ${h}px;
  `
}

export function applyDotCanvasStyle(
  showDot: boolean,
  z: number,
  w: number,
  h: number,
): SerializedStyles {
  return css`
    z-index: ${z};
    visibility: ${showDot ? "visible" : "hidden"};
    position: absolute;
    width: ${w}px;
    height: ${h}px;
  `
}

export const applyComponentCanvasStyle = (
  width: number,
  height: number,
  unitWidth: number,
  unitHeight: number = 8,
  showDot: boolean = false,
) => {
  return css`
    width: 100%;
    height: 100vh;
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
  canDrop: boolean = false,
) => {
  return css`
    width: ${w}px;
    height: ${h}px;
    border: 1px dashed
      ${canDrop ? globalColor(`--${illaPrefix}-techPurple-01`) : "red"};
    position: absolute;
    transform: translate(${x}px, ${y}px);
  `
}

export const applyRectangleStyle = (canDrop: boolean = false) => {
  return css`
    width: 100%;
    height: 100%;
    background-color: ${canDrop
      ? globalColor(`--${illaPrefix}-techPurple-01`)
      : "red"};
    opacity: 0.16;
  `
}
