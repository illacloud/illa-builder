import { css } from "@emotion/react"
import { getColor, globalColor, illaPrefix } from "@illa-design/react"
import { MOVE_BAR_HEIGHT } from "@/page/App/components/ScaleSquare/constant/moveBar"

export const warningStyle = css`
  margin-left: 4px;
`

export const applyMoveBarWrapperStyle = (
  maxWidth: number,
  minWidth: number,
  isError: boolean,
  isLikeProductionMode: boolean,
  topPosition: number,
) => {
  let borderRadiusStyle = css`
    border-radius: 4px 4px 0 0;
  `

  const backgroundColorStyle = isError
    ? globalColor(`--${illaPrefix}-red-03`)
    : globalColor(`--${illaPrefix}-techPurple-03`)
  return css`
    height: ${MOVE_BAR_HEIGHT}px;
    padding: 1px 4px 1px 0;
    background-color: ${backgroundColorStyle};
    ${borderRadiusStyle};
    display: flex;
    position: absolute;
    top: ${topPosition}px;
    left: 0;
    align-items: center;
    font-size: 12px;
    color: #fff;
    max-width: ${maxWidth}px;
    min-width: ${minWidth}px;
    visibility: ${!isLikeProductionMode ? "visible" : "hidden"};
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

export const moveBarDisplayNameStyle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
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
