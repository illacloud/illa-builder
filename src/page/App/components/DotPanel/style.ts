import { css, SerializedStyles } from "@emotion/react"

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
  w: number | null,
  h?: number | null,
): SerializedStyles {
  return css`
    position: absolute;
    width: ${w}px;
    height: ${h}px;
  `
}

export function applyDotCanvasStyle(
  edgeWidth: number,
  showDot: boolean,
): SerializedStyles {
  return css`
    z-index: -1;
    visibility: ${showDot ? "visible" : "hidden"};
    position: absolute;
  `
}

export function applyDragObjectStyle(t: number, l: number): SerializedStyles {
  return css`
    position: absolute;
    top: ${t}px;
    left: ${l}px;
  `
}
