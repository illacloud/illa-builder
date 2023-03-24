import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"
import { GUIDE_SELECT_WIDGET, SELECT_WIDGET_ITEM } from "@/config/guide/config"

const applyHighlightStyle = (currentStep: number) => css`
  [data-onboarding-session="COMMON"] {
    ${GUIDE_SELECT_WIDGET.slice(currentStep).map((widget) => {
      const icon = SELECT_WIDGET_ITEM[widget].icon
      return css`
        [data-onboarding-comp=${widget}] {
          content: url(${icon});
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

export const applyStepMaskWrapperStyle = (visible: boolean) => {
  return css`
    display: ${visible ? "block" : "none"};
    z-index: 2;
    position: absolute;
    top: 168px;
    padding: 10px;
    pointer-events: none;
    background-color: #eeeeee;
    left: 50%;
    transform: translateX(-50%);
  `
}

export const stepFirstLineStyle = css`
  display: flex;
`

export const stepMaskStyle = css`
  // text align center and middle
  width: 268px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getColor("grayBlue", "04")};
  background: ${getColor("techPurple", "07")};
  border: 1px dashed ${getColor("techPurple", "01")};
`
export const moveIconStyle = css`
  width: 24px;
  height: 24px;
  margin-right: 4px;
`

// hidden function, use visible to control
export const applyVisibleStyle = (visible: boolean) => {
  return css`
    visibility: ${visible ? "visible" : "hidden"};
  `
}
