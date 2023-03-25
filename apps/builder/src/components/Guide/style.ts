import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { GUIDE_SELECT_WIDGET, SELECT_WIDGET_ITEM } from "@/config/guide/config"

const applyHighlightStyle = (currentStep: number) => css`
  [data-onboarding-session="COMMON"] {
    ${GUIDE_SELECT_WIDGET.slice(currentStep).map((widget) => {
      const { highlightIcon } = SELECT_WIDGET_ITEM[widget]
      return css`
        [data-onboarding-comp=${widget}] {
          content: url(${highlightIcon});
        }
      `
    })}
  }
`

export const applyGuideStyle = (currentStep: number) => {
  switch (currentStep) {
    case 0:
    case 1:
    case 2:
      return applyHighlightStyle(currentStep)
    default:
      return css``
  }
}

export const applyStepMaskWrapperStyle = (
  visible: boolean,
  unitWidth: number,
) => {
  return css`
    z-index: 1;
    display: ${visible ? "flex" : "none"};
    flex-direction: column;
    position: absolute;
    top: ${unitWidth * 5}px;
    left: ${unitWidth * 5}px;
    gap: ${unitWidth * 3}px;
    pointer-events: none;
  `
}

export const stepFirstLineStyle = css`
  display: flex;
  justify-content: space-between;
`

export const stepMaskStyle = css`
  width: 268px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getColor("grayBlue", "04")};
  background: ${getColor("techPurple", "07")};
  border: 1px dashed ${getColor("techPurple", "01")};
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
    background: ${getColor("techPurple", "07")};
    border: 1px dashed ${getColor("techPurple", "01")};
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

// hidden function, use visible to control
export const applyVisibleStyle = (visible: boolean) => {
  return css`
    visibility: ${visible ? "visible" : "hidden"};
  `
}
