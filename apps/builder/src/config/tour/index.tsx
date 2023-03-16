import { StepType } from "@reactour/tour"
import { getColor } from "@illa-design/react"
import ButtonHighlightIcon from "@/assets/widgetCover/tab.svg"

const SELECT_WIDGET = ["INPUT_WIDGET", "BUTTON_WIDGET", "TABLE_WIDGET"]
const SELECT_ICON = {
  INPUT_WIDGET: ButtonHighlightIcon,
  BUTTON_WIDGET: ButtonHighlightIcon,
  TABLE_WIDGET: ButtonHighlightIcon,
}

type SelectWidget = keyof typeof SELECT_ICON

export const STEP: StepType[] = [
  {
    styles: {
      popover: (base: any) => ({
        ...base,
        display: "none",
      }),
      maskWrapper: (base: any) => ({
        ...base,
        color: "transparent",
      }),
      clickArea: (base: any) => ({
        ...base,
        display: "none",
      }),
      highlightedArea: (base: any, props: any) => ({
        ...base,
        display: "block",
        stroke: "#5ae",
        fill: "rgb(85, 170, 238,.5);",
        cursor: "pointer",
        // Dot with animation
        strokeWidth: 4,
        width: 15,
        height: 15,
        rx: 100,
        x: props.x + 10,
        y: props.y + 10,
      }),
    },
    selector: ".app-editor",
    content: "",
    // disableActions: true,
    action: (elem) => {
      // for SELECT_WIDGET array, get all the elements with the data-onboarding-comp attribute
      const elements = SELECT_WIDGET.map(
        (widget) =>
          document.querySelectorAll(
            `[data-onboarding-comp=${widget}]`,
          ) as NodeListOf<HTMLDivElement>,
      )
      console.log("elements", elements)
      // set color style to the elements
      elements.forEach((element) => {
        element.forEach((el) => {
          const onboardingComp = el.dataset.onboardingComp as SelectWidget
          const icon = SELECT_ICON[onboardingComp]
          el.setAttribute(
            "style",
            `
            color: ${getColor("techPurple", "01")}; 
            content: url(${icon})`,
          )
        })
      })
    },
    actionAfter: () => {
      const elements = SELECT_WIDGET.map((widget) =>
        document.querySelectorAll(`[data-onboarding-comp=${widget}]`),
      )
      elements.forEach((element) => {
        element.forEach((el) => {
          el.removeAttribute("style")
        })
      })
    },
  },
]
