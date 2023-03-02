import { SerializedStyles, css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"
import {
  MoveBarPositionShape,
  ScaleSquareType,
} from "@/page/App/components/ScaleSquare/interface"

export type BarPosition = "l" | "r" | "t" | "b" | "tl" | "tr" | "bl" | "br"

export const MOVE_BAR_HEIGHT = 18

export function getStateColor(scaleSquareType: ScaleSquareType): string {
  let stateColor: string
  switch (scaleSquareType) {
    case "error":
      stateColor = globalColor(`--${illaPrefix}-red-03`)
      break
    case "normal":
      stateColor = globalColor(`--${illaPrefix}-techPurple-01`)
      break
    default:
      stateColor = globalColor(`--${illaPrefix}-techPurple-01`)
      break
  }
  return stateColor
}

export function getSelectedColor(selected: boolean): string {
  return selected ? globalColor(`--${illaPrefix}-techPurple-01`) : "transparent"
}

export function applySquarePointerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  pointerPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }
  let positionStyle: SerializedStyles
  switch (pointerPosition) {
    case "tl":
      positionStyle = css`
        top: 8px;
        left: 8px;
        cursor: ${selected ? "nwse-resize" : "default"};
      `
      break
    case "tr":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        top: 8px;
        right: 8px;
      `
      break
    case "bl":
      positionStyle = css`
        cursor: ${selected ? "nesw-resize" : "default"};
        bottom: 8px;
        left: 8px;
      `
      break
    case "br":
      positionStyle = css`
        cursor: ${selected ? "nwse-resize" : "default"};
        bottom: 8px;
        right: 8px;
      `
      break
    default:
      positionStyle = css``
      break
  }

  const baseColor = getSelectedColor(selected)

  return css`
    ${positionStyle};
    box-sizing: border-box;
    border: 1px solid ${baseColor};
    height: 5px;
    width: 5px;
    position: absolute;
    background: ${selected
      ? globalColor(`--${illaPrefix}-white-01`)
      : "transparent"};
    z-index: 150;
    &:active {
      background: ${baseColor};
    }

    &:hover {
      background: ${baseColor};
    }
  `
}

export const warningStyle = css`
  margin-left: 4px;
`

export const applyBarPointerShapeStyle = (barPosition: BarPosition) => {
  let barPositionStyle: SerializedStyles

  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        left: 0;
        right: 0;
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "b":
      barPositionStyle = css`
        left: 0;
        right: 0;
        margin: auto;
        height: 5px;
        width: 24px;
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        top: 0;
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        top: 0;
        margin: auto;
        width: 5px;
        height: 24px;
      `
      break
    default:
      barPositionStyle = css``
  }
  return css`
    ${barPositionStyle};
    box-sizing: border-box;
    position: absolute;
    border-radius: 2.5px;
    background-color: ${globalColor(`--${illaPrefix}-white-01`)};
  `
}

export function applyBarPointerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
  isLimitedMode: boolean = false,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }

  let barPositionStyle: SerializedStyles =
    applyBarPointerShapeStyle(barPosition)

  const baseColor =
    isLimitedMode && selected
      ? getColor("techPink", "01")
      : getSelectedColor(selected)
  return css`
    ${barPositionStyle};
    border: 1px solid ${baseColor};
    :hover {
      background-color: ${isLimitedMode
        ? getColor("techPink", "01")
        : getColor("techPurple", "01")};
    }
    :active {
      background-color: ${isLimitedMode
        ? getColor("techPink", "01")
        : getColor("techPurple", "01")};
    }
  `
}

export function applyBorderStyle(
  selected: boolean,
  scaleSquareState: ScaleSquareType,
): SerializedStyles {
  if (scaleSquareState === "production") {
    return css`
      width: calc(100%);
      height: calc(100%);
      position: absolute;
    `
  }

  return css`
    width: calc(100%);
    height: calc(100%);
    position: absolute;
    cursor: move;
    border: 1px solid ${getSelectedColor(selected)};
    background-color: ${scaleSquareState === "error" && !selected
      ? globalColor(`--${illaPrefix}-red-07`)
      : "transparent"};

    &:hover {
      border-color: ${selected
        ? globalColor(`--${illaPrefix}-techPurple-01`)
        : getStateColor(scaleSquareState)};
      background-color: transparent;

      .handler {
        visibility: visible;
      }
    }

    &:active {
      border-color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
    }
  `
}

export function applyBarHandlerStyle(
  selected: boolean,
  scaleSquareType: ScaleSquareType,
  barPosition: BarPosition,
): SerializedStyles {
  if (scaleSquareType === "production") {
    return css`
      visibility: hidden;
    `
  }
  let barPositionStyle: SerializedStyles
  switch (barPosition) {
    case "t":
      barPositionStyle = css`
        top: 3px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: ${selected ? "row-resize" : "default"};
      `
      break
    case "b":
      barPositionStyle = css`
        bottom: 3px;
        left: 0;
        right: 0;
        height: 5px;
        cursor: ${selected ? "row-resize" : "default"};
      `
      break
    case "l":
      barPositionStyle = css`
        bottom: 0;
        left: 3px;
        top: 0;
        width: 5px;
        cursor: ${selected ? "col-resize" : "default"};
      `
      break
    case "r":
      barPositionStyle = css`
        bottom: 0;
        right: 3px;
        top: 0;
        cursor: ${selected ? "col-resize" : "default"};
        width: 5px;
      `
      break
    default:
      barPositionStyle = css``
  }

  return css`
    ${barPositionStyle};
    position: absolute;
  `
}

export const applyMoveBarWrapperStyle = (
  maxWidth: number,
  minWidth: number,
  isError: boolean,
  selected: boolean,
  isEditor: boolean,
  position: MoveBarPositionShape,
  isFreeze: boolean,
) => {
  let positionStyle = css`
    top: 0;
  `
  let borderRadiusStyle = css`
    border-radius: 4px 4px 0 0;
  `

  if (position.direction === "top") {
    positionStyle = css`
      top: ${position.position}px;
    `
  } else {
    positionStyle = css`
      bottom: ${position.position}px;
    `
    borderRadiusStyle = css`
      border-radius: 0 0 4px 4px;
    `
  }
  const backgroundColorStyle = isFreeze
    ? "transparent"
    : isError
    ? globalColor(`--${illaPrefix}-red-03`)
    : globalColor(`--${illaPrefix}-techPurple-01`)
  return css`
    height: ${MOVE_BAR_HEIGHT}px;
    padding: 1px 4px 1px 0;
    background-color: ${backgroundColorStyle};
    ${borderRadiusStyle};
    display: flex;
    position: absolute;
    ${positionStyle};
    left: 0;
    align-items: center;
    font-size: 12px;
    color: #fff;
    max-width: ${maxWidth}px;
    min-width: ${minWidth}px;
    //overflow: hidden;
    visibility: ${isEditor && selected ? "visible" : "hidden"};
    z-index: 100;
    cursor: move;
  `
}

export const displayNameContainerStyle = css`
  display: flex;
  min-width: 12px;
  flex-grow: 1;
  align-items: center;
`

export const dragPointIconWrapperStyle = css`
  width: 12px;
  height: 12px;
  flex: none;
`

export const freezeIconStyle = css`
  width: 12px;
  height: 12px;
  flex: none;
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
`

export const moveBarDisplayNameStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
`

export const freezeTipsStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${globalColor(`--${illaPrefix}-techPurple-01`)};
`

export const applyRNDWrapperStyle = (
  hasEditors: boolean,
  isSelected: boolean,
  hasError: boolean,
  isShowCanvasDot: boolean,
  isDragging: boolean,
  isEditor: boolean,
) => css`
  > .wrapperPending {
    > #moveBar {
      visibility: ${isEditor && (hasEditors || isSelected)
        ? "visible"
        : "hidden"};
    }
  }

  :hover {
    > .wrapperPending {
      border-color: ${isEditor
        ? hasError && !isSelected
          ? globalColor(`--${illaPrefix}-red-03`)
          : globalColor(`--${illaPrefix}-techPurple-01`)
        : "transparent"};

      > #moveBar {
        visibility: ${isEditor ? "visible" : "hidden"};
      }
    }

    z-index: 6;
  }

  z-index: ${hasEditors || isSelected ? 5 : 1};
  opacity: ${isDragging ? 0 : 100};
`

export const applyWrapperPendingStyle = (
  hasEditors: boolean,
  isSelected: boolean,
  hasError: boolean,
  isDragging: boolean,
  isEditor: boolean,
  isLimitedModeAndOverLap: boolean = false,
) => css`
  width: 100%;
  height: 100%;
  padding: 2px;
  border: 1px solid
    ${(isEditor && isSelected) || hasEditors
      ? globalColor(`--${illaPrefix}-techPurple-01`)
      : "transparent"};
  border-style: ${hasEditors && !isSelected && !isDragging
    ? "dashed"
    : "solid"};
  background-color: ${isEditor && hasError && !isSelected
    ? globalColor(`--${illaPrefix}-red-07`)
    : "transparent"};
  opacity: ${isDragging ? 0 : 100};
  ${isLimitedModeAndOverLap && isSelected
    ? `border-bottom:unset !important`
    : ""}
`

export const applyDashedLineStyle = (
  isSelected: boolean,
  isShowCanvasDot: boolean,
  isDragging: boolean,
  maxHeight?: number,
) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  max-height: ${maxHeight ? `${maxHeight}px` : "unset"};
  pointer-events: none;
  border: ${isShowCanvasDot && !isSelected && !isDragging
    ? `1px dashed ${globalColor(`--${illaPrefix}-techPurple-01`)}`
    : "none"};
`

export const applyXDirectionDashedLineStyle = (
  isSelected: boolean,
  isShowCanvasDot: boolean,
  isDragging: boolean,
  maxHeight?: number,
) => css`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  max-height: ${maxHeight ? `${maxHeight}px` : "unset"};
  pointer-events: none;
  border-left: ${isShowCanvasDot && !isSelected && !isDragging
    ? `1px dashed ${globalColor(`--${illaPrefix}-techPurple-01`)}`
    : "none"};
  border-right: ${isShowCanvasDot && !isSelected && !isDragging
    ? `1px dashed ${globalColor(`--${illaPrefix}-techPurple-01`)}`
    : "none"};
`

export const docIconStyle = css`
  height: 100%;
  margin-left: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const docTipsWrapperStyle = css`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px;
  color: ${getColor("grayBlue", "02")};
  word-break: break-all;
`
