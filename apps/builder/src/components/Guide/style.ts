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

export const GuideStyle = css``

export const stepMaskStyle = css`
  width: 268px;
  height: 48px;
  //color: ${getColor("techPurple", "07")};
  background: ${getColor("techPurple", "07")};
  border: 1px dashed ${getColor("techPurple", "01")};
`
