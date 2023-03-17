import { css } from "@emotion/react"
import { STEP_0_SELECT_ICON, STEP_0_SELECT_WIDGET } from "@/config/tour"

const STEP_0_STYLE = css`
  [data-onboarding-session="COMMON"] {
    ${STEP_0_SELECT_WIDGET.map((widget) => {
      const icon = STEP_0_SELECT_ICON[widget]
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
      return STEP_0_STYLE
    default:
      return css``
  }
}
