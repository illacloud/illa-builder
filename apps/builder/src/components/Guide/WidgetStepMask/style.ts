import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { UNIT_HEIGHT } from "@/page/App/components/DotPanel/constant/canvas"

export const applyStepMaskWrapperStyle = (
  visible: boolean,
  unitWidth: number,
) => {
  return css`
    display: ${visible ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    top: ${unitWidth * 5}px;
    left: 50%;
    transform: translate(-50%, 0);
    gap: ${UNIT_HEIGHT * 3}px;
    pointer-events: none;
    font-size: 14px;
  `
}

export const stepMaskStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getColor("grayBlue", "04")};
  background: ${getColor("techPurple", "08")};
  border: 1px dashed ${getColor("techPurple", "03")};
`

// transform stepMaskStyle to function, set {width, height}
export const applyStepMaskStyle = (shape: {
  width: number
  height: number
}) => {
  const { width, height } = shape
  return css`
    width: ${width}px;
    height: ${height}px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${getColor("grayBlue", "04")};
    background: ${getColor("techPurple", "08")};
    border: 1px dashed ${getColor("techPurple", "03")};
  `
}

export const moveIconStyle = css`
  width: 24px;
  height: 24px;
  margin-right: 4px;
  flex-shrink: 0;
`

export const ellipsisStyle = css`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

export const stepFirstLineStyle = css`
  display: flex;
  justify-content: space-between;
`

// hidden function, use visible to control
export const applyVisibleStyle = (visible: boolean) => {
  return css`
    visibility: ${visible ? "visible" : "hidden"};
  `
}
