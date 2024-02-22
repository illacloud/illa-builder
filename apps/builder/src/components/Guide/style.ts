import { css } from "@emotion/react"
import {
  SELECT_WIDGET_ITEM,
  getGuidSelectWidgetList,
} from "@/config/guide/config"

const applyHighlightStyle = (currentStep: number) => css`
  [data-onboarding-session="COMMON"] {
    ${getGuidSelectWidgetList()
      .slice(currentStep)
      .map((widget) => {
        const { highlightIcon } = SELECT_WIDGET_ITEM[widget]
        return css`
          [data-onboarding-icon=${widget}] {
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

export const shiftStyle = css`
  top: -15px;
`

export const actionShiftStyle = css`
  left: 84px;
`
